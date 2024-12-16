import { useState, useEffect } from "react"; // Usetate to track the imageURI
import { useWeb3Contract, useMoralis } from "react-moralis";
import talentsPoolABI from "../constants/TalentsPool.json";
import talentBadgeABI from "../constants/TalentBadge.json";
import Image from "next/image";
import { Card, useNotification } from "web3uikit";
import { ethers } from "ethers";
import UpdateListingModal from "./UpdateListingModal";

export default function BadgeHolder({
  price,
  badgeAddress,
  badgeId,
  talentsPoolAddress,
  badgeOwner,
}) {
  const { isWeb3Enabled, account } = useMoralis(); // account for identifying the current user is badge owner or not
  const [imageURI, setImageURI] = useState("");
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const [showModal, setShowModal] = useState(false); // show modal when owner click on update listing button
  const hideModal = () => setShowModal(false); // hide modal when owner click on update listing button so it can be re-opened after update again
  const dispatch = useNotification();

  const { runContractFunction: getBadgeURI } = useWeb3Contract({
    abi: talentBadgeABI,
    contractAddress: badgeAddress,
    functionName: "tokenURI",
    params: {
      badgeId: badgeId,
    },
  });

  const { runContractFunction: prepayBadge } = useWeb3Contract({
    abi: talentsPoolABI,
    contractAddress: talentsPoolAddress,
    functionName: "prepayBadge",
    msgValue: price,
    params: {
      badgeAddress: badgeAddress,
      badgeId: badgeId,
    },
  });

  async function updateUI() {
    const badgeURI = await getBadgeURI();
    console.log("badgeURI", badgeURI);
    // not every browser supports IPFS. So we need to use https instead of ipfs edition
    if (badgeURI && badgeURI.includes("ipfs://")) {
      // IPFS Gateway: make https call to return IPFS files
      const requestURL = badgeURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const badgeURIResponse = await (await fetch(requestURL)).json(); // await to fetch and get the JSON response, then await to convert it to JSON
      const imageURI = badgeURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      setImageURI(imageURIURL);
      setBadgeName(badgeURIResponse.name);
      setBadgeDescription(badgeURIResponse.description);
    }
    // Get the badgeURI
    // using the image tag from badgeURI, get the image

    // const talentBadge = useWeb3Contract("TalentBadge", badgeAddress);
    // const imageURI = await talentBadge.methods.tokenURI(badgeId).call();
    // setImageURI(imageURI);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const isOwnedByUser = badgeOwner === account || badgeOwner === undefined;
  const formattedBadgeOwnerAddress = isOwnedByUser
    ? "you"
    : truncateStr(badgeOwner || "", 15);

  const handleCardClick = () => {
    isOwnedByUser
      ? setShowModal(true)
      : prepayBadge({
          onError: (error) => console.log(error),
          onSuccess: () => handlePrepaySuccess(),
        });
  };

  const handlePrepaySuccess = () => {
    dispatch({
      type: "success",
      message: "Prepaid Successfully!",
      title: "Prepaid Successfully",
      position: "topR",
    });
  };

  return (
    <div>
      <div>
        {imageURI ? (
          <div>
            <UpdateListingModal
              badgeAddress={badgeAddress}
              badgeId={badgeId}
              talentsPoolAddress={talentsPoolAddress}
              isVisible={showModal}
              onClose={hideModal}
            />
            <Card
              title={badgeName}
              description={badgeDescription}
              onClick={handleCardClick} // handleCardClick is a function to show the modal
            >
              <div className="p-2">
                <div className="flex flex-col items-end gap-2">
                  <div>#{badgeId}</div>
                  <div className="italic text-sm">
                    Owned by {formattedBadgeOwnerAddress}
                  </div>
                  <Image
                    loader={() => imageURI}
                    src={imageURI}
                    height="200"
                    width="200"
                  />
                  <div className="font-bold">
                    {ethers.utils.formatUnits(price, "ether")} ETH
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

// for make the address shorter
const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr;

  const separator = "...";
  const seperatorLength = separator.length;
  const charsToShow = strLen - seperatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};
