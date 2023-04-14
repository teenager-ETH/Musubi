const { developmentChains } = require("../helper-hardhat-config");
const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Attack", function () {
          let decentralizedBankFixChallenge, attack, deployer, talent;
          // deploye the DecentralizedBankFixChallenge contract and the Attack contract completed by the talent
          before(async function () {
              await deployments.fixture(); //
              deployer = (await getNamedAccounts()).deployer;
              talent = (await getNamedAccounts()).talent;
              decentralizedBankFixChallenge = await ethers.getContract(
                  "DecentralizedBankFixChallenge"
              );
              // deployer deposit 10 eths to the decentralized bank
              decentralizedBankFixChallenge.connect(deployer);
              await decentralizedBankFixChallenge.deposit({
                  value: ethers.utils.parseEther("10"),
              });
              attack = await ethers.getContract("Attack");
          });
          describe("Preset", function () {
              it("should have an initial balance of 10 ETH", async function () {
                  expect(
                      await decentralizedBankFixChallenge.getBalance()
                  ).to.equal(ethers.utils.parseEther("10"));
              });
          });

          describe("if the talent is able to steal the money", function () {
              it("Bank should have 0, which is drained", async function () {
                  // the talent is able to steal the money
                  await attack.connect(talent);
                  await expect(
                      attack.attack({
                          value: ethers.utils.parseEther("1"),
                      })
                  ).to.be.revertedWith("Failed to send Ether");

                  expect(
                      await decentralizedBankFixChallenge.getBalance()
                  ).to.equal(ethers.utils.parseEther("10"));
                  expect(await attack.getBalance()).to.equal(
                      ethers.utils.parseEther("0")
                  );
              });
          });
      });
