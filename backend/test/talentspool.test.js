const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("TalentsPool", function () {
          let talentsPool, talentBadge, deployer, talent, employer;

          const PRICE = ethers.utils.parseEther("0.1"); //
          const BADGE_ID = 0;
          const LEVEL = 1; // skillLevel may be changed later to reflect testing result data to metadata
          beforeEach(async function () {
              accounts = await ethers.getSigners();
              deployer = accounts[0];
              talent = accounts[1];
              employer = accounts[2];
              await deployments.fixture(["all"]);
              talentsPool = await ethers.getContract("TalentsPool"); // default account is deployer
              talentBadge = await ethers.getContract("TalentBadge");
              talentBadgeConnectedTalent = talentBadge.connect(talent);
              talentBadgeConnectedEmployer = talentBadge.connect(employer);
              talentsPoolConnectedTalent = talentsPool.connect(talent);
              talentsPoolConnectedEmployer = talentsPool.connect(employer);
              talentsPoolConnectedDeployer = talentsPool.connect(deployer);
              await talentBadgeConnectedTalent.mintBadge(LEVEL);
              await talentBadgeConnectedTalent.approve(talentsPool.address, BADGE_ID);
          });
          it("should return the correct price", async function () {
              await talentsPoolConnectedTalent.listBadge(talentBadge.address, BADGE_ID, PRICE); // talent list badge on the market
              await talentsPoolConnectedEmployer.prepayBadge(talentBadge.address, BADGE_ID, {
                  value: PRICE,
              }); // employer prepay badge
              // get balance of talent
              const prevBalance = await ethers.provider.getBalance(talent.address);
              const txResponse = await talentsPoolConnectedTalent.withdrawEarnings(); // talent withdraw income
              const txReceipt = await txResponse.wait();
              const gasUsed = txReceipt.gasUsed;
              const gasPrice = txResponse.gasPrice;
              const gasCost = gasUsed.mul(gasPrice);

              // get balance of talent
              const curBalance = await ethers.provider.getBalance(talent.address);
              assert.equal(prevBalance.add(PRICE).sub(gasCost).toString(), curBalance.toString());
          });
      });
