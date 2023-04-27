const { network, ethers } = require("hardhat");
// const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    let decentralizedBanktoAttack = await ethers.getContract(
        "DecentralizedBanktoAttack"
    );
    let decentralizedBanktoAttackaddress = decentralizedBanktoAttack.address;

    const args = [decentralizedBanktoAttackaddress];

    const Attack = await deploy("AttackChallenge", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockchainConfirmations || 1,
    });
};

module.exports.tags = ["all", "AttackChallenge"];
