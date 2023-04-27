const networkConfig = {
  31337: {
    name: "localhost",
  },
  1: {
    name: "mainnet",
  },
  5: {
    name: "goerli",
  },
  137: {
    name: "polygon",
  },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
};
