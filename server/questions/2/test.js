const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { expect } = require("chai");

const developmentChains = ["hardhat", "localhost"];

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Attack", function () {
          let decentralizedBanktoAttackFixChallengeContract,
              attackContract,
              deployer,
              talent;

          before(async function () {
              // 部署银行合约
              const DecentralizedBanktoAttackFixChallengeContract =
                  await ethers.getContractFactory(
                      "DecentralizedBanktoAttackFixChallenge"
                  );

              decentralizedBanktoAttackFixChallengeContract =
                  await DecentralizedBanktoAttackFixChallengeContract.deploy();

              await decentralizedBanktoAttackFixChallengeContract.deployed();

              await deployments.fixture();
              deployer = (await getNamedAccounts()).deployer;
              talent = (await getNamedAccounts()).talent;

              // 部署攻击合约
              const AttackContract = await ethers.getContractFactory("Attack");
              attackContract = await AttackContract.deploy(
                  decentralizedBanktoAttackFixChallengeContract.address
              );
              await attackContract.deployed();

              // deployer deposit 10 eths to the decentralized bank
              // deployer链接到银行合约
              decentralizedBanktoAttackFixChallengeContract.connect(deployer);

              // 向银行存入10个以太
              await decentralizedBanktoAttackFixChallengeContract.deposit({
                  value: ethers.utils.parseEther("10"),
              });
          });

          describe("if the talent can't steal the money", function () {
              it("Bank should have 10, which is drained", async function () {
                  // the talent is able to steal the money
                  await attackContract.connect(talent);
                  await expect(
                      attackContract.attack({
                          value: ethers.utils.parseEther("1"),
                      })
                  ).to.be.revertedWith("Failed to send Ether");

                  expect(
                      await decentralizedBanktoAttackFixChallengeContract.getBalance()
                  ).to.equal(ethers.utils.parseEther("10"));

                  expect(await attackContract.getBalance()).to.equal(
                      ethers.utils.parseEther("0")
                  );
              });
          });
      });
