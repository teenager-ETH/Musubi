const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("-------------------------------------");
    log("Deploying TalentsPool...");

    const args = [];

    const talentPool = await deploy("TalentsPool", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockchainConfirmations || 1,
    });

    if (!developmentChains.includes(network.name)) {
        log("Verify contract on etherscan...");
        await verify(talentPool.address, args);
    }

    log("-------------------------------------");
};

module.exports.tags = ["all", "talenPool", "main"];
