require('@nomicfoundation/hardhat-chai-matchers');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-deploy');

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: 'hardhat',
  mocha: {
    timeout: 200000,
    reporter: 'json',
    reporterOption: {
      output: './reporter.json',
    },
  },
};
