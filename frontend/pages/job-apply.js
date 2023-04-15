import styles from "../styles/Home.module.css";
import { Form, useNotification, Button } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import attestAbi from "../constants/Attest.json";
import networkMapping from "../constants/networkMapping.json";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { identityState } from "@/components/CodingPad/state";
import { keccak256, toUtf8Bytes, toUtf8String } from "ethers/lib/utils";
import * as ecies25519 from "@kumarargentra/ecies-25519";
import { BigNumber } from "ethers";

export default function Home() {
  const { chainId, account, isWeb3Enabled } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const attestAddress = networkMapping[chainString].Attest;
  const dispatch = useNotification();
  const [id] = useAtom(identityState)
  const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

  const { runContractFunction } = useWeb3Contract();
  console.log(id)
  async function List(data) {
    // data is from the Form inputs
    const enckeyPair = ecies25519.generateKeyPair(
      fromHexString(
          BigNumber.from(id.secretHash).toHexString().slice(2)))
    const jd = data.data[0].inputResult;
    const lvReq = data.data[1].inputResult;

    const idx = keccak256(toUtf8Bytes(lvReq+jd+BigNumber.from(enckeyPair.publicKey).toString()))
    // console.log(await userState.genProveReputationProof({minRep:1}))

    // Encrypt/Decrypt email example
    
    const Options = {
      abi: attestAbi,
      contractAddress: attestAddress,
      functionName: "createJob",
      params: {
        _job: [idx, lvReq, jd, BigNumber.from(enckeyPair.publicKey)]
      },
    };
    console.log(Options)
    await runContractFunction({
      params: Options,
      onSuccess: (tx) => handleListSuccess(),
      onError: (error) => {
        console.log(error);
      },
    });
  }

  async function handleListSuccess() {
    dispatch({
      type: "success",
      message: "Listed Successfully!",
      title: "Listed Successfully",
      position: "topR",
    });
  }

  async function setupUI() {
    // const returnedEarnings = await runContractFunction({
    //   params: {
    //     abi: attestAbi,
    //     contractAddress: attestAddress,
    //     functionName: "getEarnings",
    //     params: {
    //       talentAddress: account,
    //     },
    //   },
    //   onError: (error) => console.log(error),
    // });
    // if (returnedEarnings) {
    //   setEarnings(returnedEarnings.toString());
    // }
  }

  useEffect(() => {
    setupUI();
  }, [account, isWeb3Enabled, chainId]);

  return (
    <div className={styles.container}>
      <Form
        onSubmit={List} // approve talentsPool contract to list the badge
        data={[
          {
            name: "Job Detail",
            type: "textarea",
            inputWidth: "50%",
            value: "",
            key: "jd",
          },
          {
            name: "Leval Requirement",
            type: "number",
            value: "",
            key: "lvReq",
          }
        ]}
        title="List your Job for finding talents!"
        id="Main Form"
      />
    </div>
  );
}
