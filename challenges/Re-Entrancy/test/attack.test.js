const { developmentChains } = require("../helper-hardhat-config");
const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Attack", function () {
          let decentralizedBanktoAttack, attackChallenge, deployer, talent;
          // deploye the DecentralizedBanktoAttack contract and the AttackChallenge contract completed by the talent
          before(async function () {
              await deployments.fixture(); //
              deployer = (await getNamedAccounts()).deployer;
              talent = (await getNamedAccounts()).talent;
              decentralizedBanktoAttack = await ethers.getContract(
                  "DecentralizedBanktoAttack"
              );
              // deployer deposit 10 eths to the decentralized bank
              decentralizedBanktoAttack.connect(deployer);
              await decentralizedBanktoAttack.deposit({
                  value: ethers.utils.parseEther("10"),
              });
              attackChallenge = await ethers.getContract("AttackChallenge");
          });
          describe("Preset", function () {
              it("should have an initial balance of 10 ETH", async function () {
                  expect(await decentralizedBanktoAttack.getBalance()).to.equal(
                      ethers.utils.parseEther("10")
                  );
              });
          });

          describe("if the talent is able to steal the money", function () {
              it("Bank should have 0, which is drained", async function () {
                  // the talent is able to steal the money
                  await attackChallenge.connect(talent);
                  await attackChallenge.attack({
                      value: ethers.utils.parseEther("1"),
                  });
                  expect(await decentralizedBanktoAttack.getBalance()).to.equal(
                      ethers.utils.parseEther("0")
                  );
                  expect(await attackChallenge.getBalance()).to.equal(
                      ethers.utils.parseEther("11")
                  );
              });
          });
      });

// const { ethers } = require("hardhat");
// const { expect } = require("chai");

// describe("Attack Successfully", function () {
//     let decentralizedBanktoAttack, attackChallenge, alice, bob, eve;

//     beforeEach(async function () {
//         // Get signers
//         [alice, bob, eve] = await ethers.getSigners();

//         // Deploy EtherStore contract
//         const DecentralizedBanktoAttack = await ethers.getContractFactory(
//             "DecentralizedBanktoAttack"
//         );
//         decentralizedBanktoAttack = await DecentralizedBanktoAttack.deploy();
//         await decentralizedBanktoAttack.deployed();

//         // Alice and Bob deposit 1 Ether each
//         await decentralizedBanktoAttack
//             .connect(alice)
//             .deposit({ value: ethers.utils.parseEther("1") });
//         await decentralizedBanktoAttack
//             .connect(bob)
//             .deposit({ value: ethers.utils.parseEther("1") });

//         // Deploy Attack contract with the address of EtherStore
//         const AttackChallenge = await ethers.getContractFactory("Attack");
//         attackChallenge = await AttackChallenge.deploy(
//             decentralizedBanktoAttack.address
//         );
//         await attackChallenge.deployed();
//     });

//     it("should steal drain funds from EtherStore", async function () {
//         // Eve launches the attack with 1 Ether
//         await attackChallenge
//             .connect(eve)
//             .attack({ value: ethers.utils.parseEther("1") });

//         // Check if Eve has received 3 Ethers
//         const eveBalance = await attackChallenge.getBalance();
//         expect(eveBalance).to.equal(ethers.utils.parseEther("3"));
//     });
// });
