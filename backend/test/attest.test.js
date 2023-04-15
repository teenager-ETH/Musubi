const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const deployUnirep= require("../deploy/Unirep/deployUnirep");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Attest", function () {
        let Attest, Unirep, deployer, attester, employer;
        beforeEach(async function () {
            accounts = await ethers.getSigners();
            deployer = accounts[0];
            attester = accounts[1];
            employer = accounts[2];
            //   await deployments.fixture(["all"]);
            Unirep = await deployUnirep(accounts[0])

            const AttestContractFactory = await ethers.getContractFactory("Attest"); // default account is deployer
            Attest = await AttestContractFactory.connect(attester).deploy(Unirep.address)

        });
        it("should return the correct price", async function () {
            //       await talentsPoolConnectedTalent.listBadge(talentBadge.address, BADGE_ID, PRICE); // talent list badge on the market
            //       await talentsPoolConnectedEmployer.prepayBadge(talentBadge.address, BADGE_ID, {
            //           value: PRICE,
            //       }); // employer prepay badge
            //       // get balance of talent
            //       const prevBalance = await ethers.provider.getBalance(talent.address);
            //       const txResponse = await talentsPoolConnectedTalent.withdrawIncome(); // talent withdraw income
            //       const txReceipt = await txResponse.wait();
            //       const gasUsed = txReceipt.gasUsed;
            //       const gasPrice = txResponse.gasPrice;
            //       const gasCost = gasUsed.mul(gasPrice);

            //       // get balance of talent
            //       const curBalance = await ethers.provider.getBalance(talent.address);
            //       assert.equal(prevBalance.add(PRICE).sub(gasCost).toString(), curBalance.toString());
        });
    });
