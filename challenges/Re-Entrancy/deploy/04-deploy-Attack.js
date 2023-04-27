const { network, ethers } = require("hardhat");
// const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    let decentralizedBankFixChallenge = await ethers.getContract(
        "DecentralizedBankFixChallenge"
    );
    let decentralizedBankFixChallengeAddress =
        decentralizedBankFixChallenge.address;

    const args = [decentralizedBankFixChallengeAddress];

    const Attack = await deploy("Attack", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockchainConfirmations || 1,
    });
};

module.exports.tags = ["all", "DecentralizedBankFixChallenge"];
