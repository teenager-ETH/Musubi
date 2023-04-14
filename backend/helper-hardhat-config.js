const networkConfig = {
    31337: {
        name: "localhost",
        keyHash:
            "0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a", // 30 gwei
        mintFee: "10000000000000000", // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    // 1: {
    //     name: "mainnet",
    //     // subId: 9629,
    //     keyHash:
    //         "0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a", // 30 gwei
    //     mintFee: "10000000000000000", // 0.01 ETH
    //     callbackGasLimit: "500000", // 500,000 gas
    // },
    5: {
        name: "goerli",
        subId: 9629,
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        keyHash:
            "0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a",
        callbackGasLimit: "500000", // 500,000 gas
        mintFee: "10000000000000000", // 0.01 ETH
    },
    // 137: {
    //     name: "polygon",
    // },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains,
};
