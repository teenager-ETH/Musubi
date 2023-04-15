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
import { BigNumber, ethers } from "ethers";
import networkMapping from "../constants/networkMapping.json";
import { ZkIdentity, stringifyBigInts } from "@unirep/utils";
import { defaultProver } from "./provers/defaultProver";
import * as ecies25519 from "@kumarargentra/ecies-25519";
import { toUtf8Bytes, toUtf8String } from "ethers/lib/utils";
import { BuildOrderedTree, Circuit } from "@unirep/circuits";

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

    const syncUnirep = async (setUserState, identity, setHasSignedUp) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const userState = new UserState({
            attesterId: 31376303960552734473851074669000539669478016324n,
            prover: defaultProver, // a circuit prover
            unirepAddress: unirepAddress,
            provider, // an ethers.js provider
        }, identity)
        console.log(userState)
        setUserState(userState)
        await userState.sync.start()
        console.log(1)
        await userState.sync.waitForSync()
        console.log(2)

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
        console.log(await userState.sync.calcCurrentEpoch())
        
        const toEpoch = await userState.sync.loadCurrentEpoch()
        const latestTEpoch = await userState.latestTransitionedEpoch()
        console.log(toEpoch, latestTEpoch)
        if (latestTEpoch < toEpoch) {
            const preimages = await userState.sync.genEpochTreePreimages(toEpoch)
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
            const { publicSignals, proof } = await userState.genUserStateTransitionProof(toEpoch)
            const data = await fetch(
                `/api/userStateTransition?${new URLSearchParams({
                    body: JSON.stringify({
                        epoch: toEpoch,
                        publicSignals, proof,
                        orderedTreePublicSignals:o.publicSignals,
                        orderedTreeProof:o.proof
                    })
                })}`
            );
            console.log(data)
        }
        await userState.sync.waitForSync();
        // console.log(await userState.genProveReputationProof({proveZeroRep:true}))

        const fromHexString = hexString =>
            new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        console.log(BigNumber.from(
            identity.secretHash).toHexString().slice(2))
        const enckeyPair = ecies25519.generateKeyPair(
            fromHexString(
                BigNumber.from(
                    identity.secretHash).toHexString().slice(2)))
        setEnckeyPairAtom(enckeyPair)
        // Encrypt/Decrypt email example
        const encrypted = await ecies25519.encrypt(toUtf8Bytes('zxc82990@gmail.com'), enckeyPair.publicKey);
        console.log(encrypted)
        const secret = await ecies25519.decrypt(encrypted, enckeyPair.privateKey);
        console.log(toUtf8String(secret))
        // console.log(await userState.genProveReputationProof({minRep:1 }))
    }
    const [id, setId] = useAtom(identityState);
    const [unirepUserState, setUnirepUserState] = useAtom(unirepState);
    const [hasSignedUp, setHasSignedUp] = useAtom(signedUpState);
    const [ed25515keyPair, setEnckeyPairAtom] = useAtom(enckeyPairAtom);

    useEffect(() => {
        if (id.trapdoor) {
            syncUnirep(setUnirepUserState, id, setHasSignedUp, setEnckeyPairAtom)
        }
    }, [id.trapdoor]);
    if (hasSignedUp) return ''
    return (
        <div>
            <button onClick={(e) => { login(setId, account) }}>Sign In</button>
        </div>
    )
}
export default LoginForm;