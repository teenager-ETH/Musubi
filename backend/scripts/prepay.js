const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");

const TOKEN_ID = 0;
const PRICE = ethers.utils.parseEther("0.1");

async function prepay() {
    const talentsPool = await ethers.getContract("TalentsPool");
    const talentBadge = await ethers.getContract("TalentBadge");
    const prepayTx = await talentsPool.prepayBadge(talentBadge.address, TOKEN_ID, { value: PRICE });
    await prepayTx.wait(1);
    console.log("Prepaid");
    if (network.config.chainId == "31337") {
        console.log("Mining 2 blocks...");
        await moveBlocks(2, (sleepTimeInMs = 1000));
    }
}

prepay()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
