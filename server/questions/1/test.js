const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { expect } = require("chai");

const developmentChains = ["hardhat", "localhost"];

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("AttackChanllenge", function () {
          let decentralizedBanktoAttackContract,
              attackChallengeContract,
              deployer,
              talent;

          // deploye the DecentralizedBanktoAttack contract and the AttackChallenge contract completed by the talent
          before(async function () {
              const DecentralizedBanktoAttackContract =
                  await ethers.getContractFactory("DecentralizedBanktoAttack");

              decentralizedBanktoAttackContract =
                  await DecentralizedBanktoAttackContract.deploy();

              await decentralizedBanktoAttackContract.deployed();

              await deployments.fixture();

              deployer = (await getNamedAccounts()).deployer;
              talent = (await getNamedAccounts()).talent;

              console.log("deployer: ", deployer, "telent: ", talent);

              const AttackChallengeContract = await ethers.getContractFactory(
                  "AttackChallenge"
              );
              attackChallengeContract = await AttackChallengeContract.deploy(
                  decentralizedBanktoAttackContract.address
              );
              await attackChallengeContract.deployed();

              decentralizedBanktoAttackContract.connect(deployer);
              await decentralizedBanktoAttackContract.deposit({
                  value: ethers.utils.parseEther("10"),
              });
          });

          describe("if the talent is able to steal the money", function () {
              it("Bank should have 0, which is drained", async function () {
                  // the talent is able to steal the money
                  await attackChallengeContract.connect(talent);
                  await attackChallengeContract.attack({
                      value: ethers.utils.parseEther("1"),
                  });
                  expect(
                      (await decentralizedBanktoAttackContract.getBalance()).toHexString()
                  ).to.equal(ethers.utils.parseEther("0").toHexString());
                  expect((await attackChallengeContract.getBalance()).toHexString()).to.equal(
                      ethers.utils.parseEther("11").toHexString()
                  );
              });
          });
      });
