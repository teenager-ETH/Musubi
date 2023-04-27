const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");

const BADGE_ID = 0;

async function unlist() {
    const talentsPool = await ethers.getContract("TalentsPool");
    const talentBadge = await ethers.getContract("TalentBadge");
    console.log("Unlisting the badge from the talents pool...");
    const unlistTx = await talentsPool.unlistBadge(talentBadge.address, BADGE_ID);
    await unlistTx.wait(1);
    console.log("Badge unlisted!");
    if (network.config.chainId == "31337") {
        console.log("Mining 2 blocks...");
        await moveBlocks(2, (sleepTimeInMs = 1000));
    }
}

unlist()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
