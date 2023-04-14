const { network } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

const FUND_AMOUNT = "10000000000000000000"; // 10 LINK

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    log("-------------------------------------");
    log("Deploying ChallengeSelection...");

    let vrfCoordinatorV2Address, subId;

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
        const txResponse = await vrfCoordinatorV2Mock.createSubscription();
        const txReceipt = await txResponse.wait(1);
        subId = txReceipt.events[0].args.subId;
        await vrfCoordinatorV2Mock.fundSubscription(subId, FUND_AMOUNT);
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
        subId = networkConfig[chainId].subId;
    }

    log("-------------------------------------");

    // constructor(
    //     address vrfCoordinatorV2,
    //     uint64 subId,
    //     bytes32 keyHash,
    //     uint32 callbackGasLimit
    // ) VRFConsumerBaseV2(vrfCoordinatorV2) {
    //     i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
    //     i_subId = subId; // to edit
    //     i_keyHash = keyHash; // to edit
    //     i_callbackGasLimit = callbackGasLimit;
    // }

    const args = [
        vrfCoordinatorV2Address,
        subId,
        networkConfig[chainId].keyHash,
        networkConfig[chainId].callbackGasLimit,
    ];

    const challengeSelection = await deploy("ChallengeSelection", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockchainConfirmations || 1,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verify contract on etherscan...");
        await verify(challengeSelection.address, args);
    }
};

module.exports.tags = ["all", "challengeSelection", "main"];
