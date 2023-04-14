const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("TalentBadge", function () {
          let talentBadge, deployer;
          beforeEach(async () => {
              accounts = await ethers.getSigners();
              deployer = accounts[0];
              await deployments.fixture(["TalentBadge"]);
              talentBadge = await ethers.getContract("TalentBadge");
          });

          describe("Constructor", function () {
              it("Should set the right owner", async function () {});
          });

          describe("mint", function () {
              beforeEach(async function () {});
          });
      });
