const hre = require("hardhat");

async function main() {

  const Attest = await hre.ethers.getContractFactory("Attest");
  const attest = await Attest.deploy("0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e");

  await attest.deployed();

  console.log(
    `Attest deployed to ${attest.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});