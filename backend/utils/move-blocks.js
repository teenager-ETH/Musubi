const { network } = require("hardhat");

function sleep(timeInMs) {
    return new Promise((resolve) => setTimeout(resolve, timeInMs));
}

// For local testing, we can use this script to move the block number forward
async function moveBlocks(blocks, sleepTimeInMs = 0) {
    for (let i = 0; i < blocks; i++) {
        await network.provider.request({
            method: "evm_mine",
            params: [],
        });
        if (sleepTimeInMs) {
            console.log(`Sleeping for ${sleepTimeInMs} ms`);
            await sleep(sleepTimeInMs);
        }
    }
}

module.exports = { moveBlocks, sleep };
