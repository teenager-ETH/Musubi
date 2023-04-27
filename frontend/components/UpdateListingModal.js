import { Modal, Input, useNotification } from "web3uikit";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import talentsPoolABI from "../constants/TalentsPool.json";
import { ethers } from "ethers";

export default function UpdateListingModal({
  badgeAddress,
  badgeId,
  talentsPoolAddress,
  isVisible, // this is the prop that will be passed in from BadgeHolder.js
  onClose,
}) {
  const dispatch = useNotification();

  const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0);

  const handleUpdateListingSuccess = /*async*/ (/*tx*/) => {
    // notification to the user that the listing has been updated
    /* await tx.wait(1); */
    dispatch({
      type: "success",
      message: "listing price updated",
      title: "Listing price updated - please refresh (and move blocks)",
      position: "topR",
    });
    onClose && onClose();
    setPriceToUpdateListingWith("0");
  };

  const { runContractFunction: updatePrice } = useWeb3Contract({
    abi: talentsPoolABI,
    contractAddress: talentsPoolAddress,
    functionName: "updatePrice",
    params: {
      badgeAddress: badgeAddress,
      badgeId: badgeId,
      newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
      onOk={() => {
        // call the updateListing function when the user clicks the "OK" button to update onchain.
        updatePrice({
          onError: (error) => {
            console.log(error);
          },
          onSuccess: () => handleUpdateListingSuccess(), // onSuccess automatically passes the result of the contract function call, here is the tx.
        });
      }}
    >
      <Input
        label="Update listing price in ETH"
        name="New listing price"
        type="number"
        onChange={(event) => {
          setPriceToUpdateListingWith(event.target.value); // this is the value that the amount of ETH to update the listing with by the badge owner
        }}
      />
    </Modal>
  );
}
