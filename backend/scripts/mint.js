const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");

const LEVEL = 1; // change this to reflect testing result data to metadata later
const PRICE = ethers.utils.parseEther("0.1"); // change this later

async function mint() {
    const talentBadge = await ethers.getContract("TalentBadge");
    console.log("Minting a talent badge...");
    const mintTx = await talentBadge.mintBadge(LEVEL);
    const mintTxReceipt = await mintTx.wait(1);
    console.log(
        `Minted badgeId ${mintTxReceipt.events[1].args.badgeId.toString()} from contract: ${
            talentBadge.address
        }`
    );

    if (network.config.chainId == "31337") {
        console.log("Mining 1 block...");
        await moveBlocks(1, (sleepTimeInMs = 1000));
    }
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
