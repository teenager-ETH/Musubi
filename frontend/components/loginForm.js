import React, { useEffect, useState } from "react";
import { useAtom } from 'jotai';
import {
    identityState,
    unirepState,
    signedUpState,
    enckeyPairAtom
} from './CodingPad/state'
import { useMoralis } from "react-moralis";
import { UserState } from '@unirep/core'
import { ethers } from "ethers";
import networkMapping from "../constants/networkMapping.json";
import { ZkIdentity, stringifyBigInts } from "@unirep/utils";
import { defaultProver } from "./provers/defaultProver";
import { BuildOrderedTree, Circuit } from "@unirep/circuits";
import { Button } from "@chakra-ui/react";

const login = async (setId, address) => {
    const exampleMessage = 'Example `personal_sign` message.';
    try {

        const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
        const sign = await window.ethereum.request({
            method: 'personal_sign',
            params: [msg, address, 'Example password'],
        });
        const nID = new ZkIdentity(1, sign)
        setId(nID)

    } catch (err) {
        console.error(err);
    }
}
const LoginForm = () => {
    const { chainId, account } = useMoralis();
    const chainString = chainId ? parseInt(chainId).toString() : "31337";
    const unirepAddress = networkMapping[chainString]?.Unirep;
    const [id, setId] = useAtom(identityState);
    const [unirepUserState, setUnirepUserState] = useAtom(unirepState);
    const [hasSignedUp, setHasSignedUp] = useAtom(signedUpState);
    const [ed25515keyPair, setEnckeyPairAtom] = useAtom(enckeyPairAtom);
    const [isRunning, setIsRunning] = useState(false)

    const syncUnirep = async (setUserState, identity, setHasSignedUp) => {

        setIsRunning(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const userState = new UserState({
            attesterId: 31376303960552734473851074669000539669478016324n,
            prover: defaultProver, // a circuit prover
            unirepAddress: unirepAddress,
            provider, // an ethers.js provider
        }, identity)

        setUserState(userState)
        await userState.sync.start()
        await userState.sync.waitForSync()

        const signedUp = await userState.hasSignedUp()
        setHasSignedUp(signedUp)

        if (!signedUp) {
            const { publicSignals, proof } = await userState.genUserSignUpProof()
            // TODO: Call signUp post
            const data = await fetch(
                `/api/userSignUp?${new URLSearchParams({
                    body: JSON.stringify({ publicSignals, proof })
                })}`
            );
            console.log(data)
            setHasSignedUp(signedUp)
            await userState.sync.waitForSync();
        }
        console.log(userState.sync.settings)
        const calcEpoch = await userState.sync.calcCurrentEpoch()
        const currentEpoch = await userState.sync.loadCurrentEpoch()
        const latestTEpoch = await userState.latestTransitionedEpoch()
        console.log(calcEpoch, latestTEpoch, currentEpoch)
        if (calcEpoch > latestTEpoch) {
            // if(false){
            if (currentEpoch <= latestTEpoch) {
                const preimages = await userState.sync.genEpochTreePreimages(latestTEpoch)
                const { circuitInputs } = BuildOrderedTree.buildInputsForLeaves(preimages)
                const r = await defaultProver.genProofAndPublicSignals(
                    Circuit.buildOrderedTree,
                    stringifyBigInts(circuitInputs)
                )


                const o = new BuildOrderedTree(
                    r.publicSignals,
                    r.proof,
                    defaultProver
                )

                const data = await fetch(
                    `/api/sealEpoch?${new URLSearchParams({
                        body: JSON.stringify({
                            epoch: latestTEpoch,
                            publicSignals: o.publicSignals, proof: o.proof
                        })
                    })}`
                );
                await userState.sync.waitForSync();
            }
            console.log(await userState.sync.loadCurrentEpoch())
            const { publicSignals, proof } = await userState.genUserStateTransitionProof(await userState.sync.loadCurrentEpoch())

            const data2 = await fetch(
                `/api/userStateTransition?${new URLSearchParams({
                    body: JSON.stringify({
                        publicSignals, proof
                    })
                })}`
            );
            await userState.sync.waitForSync();
            console.log(await userState.sync.loadCurrentEpoch())
            console.log(data2)
        }
        await userState.sync.waitForSync();
        setIsRunning(false)
    }

    useEffect(() => {
        if (id.trapdoor) {
            syncUnirep(setUnirepUserState, id, setHasSignedUp, setEnckeyPairAtom)
        }
    }, [id.trapdoor]);
    if (hasSignedUp && !isRunning) return ''
    return (
        <div>
            <Button
                isLoading={isRunning}
                loadingText='Initializing...'
                bg='blue.600'
                _hover={{ bg: 'blue.700' }}
                className='px-2 py-1 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600'
                onClick={(e) => { login(setId, account) }}>Sign In</Button>
        </div>
    )
}
export default LoginForm;