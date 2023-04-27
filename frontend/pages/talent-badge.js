import styles from "../styles/Home.module.css";
import { Form, useNotification, Button } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import talentBadgeABI from "../constants/TalentBadge.json";
import talentsPoolABI from "../constants/TalentsPool.json";
import networkMapping from "../constants/networkMapping.json";
import { useEffect, useState } from "react";

export default function Home() {
  const { chainId, account, isWeb3Enabled } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const talentsPoolAddress = networkMapping[chainString].TalentsPool[0];
  const dispatch = useNotification();
  const [earnings, setEarnings] = useState("0");

  const { runContractFunction } = useWeb3Contract();

  async function approveAndList(data) {
    console.log("Approving...");
    // data is from the Form inputs
    const badgeAddress = data.data[0].inputResult;
    const badgeId = data.data[1].inputResult;
    const price = ethers.utils
      .parseUnits(data.data[2].inputResult, "ether")
      .toString();

    const approveOptions = {
      abi: talentBadgeABI,
      contractAddress: badgeAddress,
      functionName: "approve",
      params: {
        to: talentsPoolAddress,
        tokenId: badgeId,
      },
    };

    await runContractFunction({
      params: approveOptions,
      onSuccess: (tx) => handleApproveSuccess(tx, badgeAddress, badgeId, price),
      onError: (error) => {
        console.log(error);
      },
    });
  }

  async function handleApproveSuccess(tx, badgeAddress, badgeId, price) {
    console.log("Listing...");
    await tx.wait();
    const listOptions = {
      abi: talentsPoolABI,
      contractAddress: talentsPoolAddress,
      functionName: "listBadge",
      params: {
        badgeAddress: badgeAddress,
        badgeId: badgeId,
        price: price,
      },
    };

    await runContractFunction({
      params: listOptions,
      onSuccess: () => handleListSuccess(),
      onError: (error) => console.log(error),
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

  const handleWithdrawSuccess = () => {
    dispatch({
      type: "success",
      message: "Withdrawing Earnings!",
      position: "topR",
    });
  };

  async function setupUI() {
    const returnedEarnings = await runContractFunction({
      params: {
        abi: talentsPoolABI,
        contractAddress: talentsPoolAddress,
        functionName: "getEarnings",
        params: {
          talentAddress: account,
        },
      },
      onError: (error) => console.log(error),
    });
    if (returnedEarnings) {
      setEarnings(returnedEarnings.toString());
    }
  }

  useEffect(() => {
    setupUI();
  }, [earnings, account, isWeb3Enabled, chainId]);

  return (
    <div className={styles.container}>
      <Form
        onSubmit={approveAndList} // approve talentsPool contract to list the badge
        data={[
          {
            name: "Badge Address",
            type: "text",
            inputWidth: "50%",
            value: "",
            key: "badgeAddress",
          },
          {
            name: "Badge ID",
            type: "number",
            value: "",
            key: "badgeId",
          },
          {
            name: "Price (in ETH)",
            type: "number",
            value: "",
            key: "price",
          },
        ]}
        title="List your Badge for Opening your position!"
        id="Main Form"
      />
      <div>Withdraw {earnings} earnings</div>
      {earnings != "0" ? (
        <Button
          onClick={() => {
            runContractFunction({
              params: {
                abi: talentsPoolABI,
                contractAddress: talentsPoolAddress,
                functionName: "withdrawEarnings",
                params: {},
              },
              onError: (error) => console.log(error),
              onSuccess: () => handleWithdrawSuccess,
            });
          }}
          text="Withdraw"
          type="button"
        />
      ) : (
        <div>No earnings detected</div>
      )}
    </div>
  );
}
