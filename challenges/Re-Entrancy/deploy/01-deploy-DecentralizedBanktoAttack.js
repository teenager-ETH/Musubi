const { network, ethers } = require("hardhat");
// const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const args = [];

    const decentralizedBanktoAttack = await deploy(
        "DecentralizedBanktoAttack",
        {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: network.config.blockchainConfirmations || 1,
        }
    );
};

module.exports.tags = ["all", "DecentralizedBanktoAttack"];
