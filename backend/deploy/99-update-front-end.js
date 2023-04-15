const { frontEndContractsFile, frontEndABILocation } = require("../helper-hardhat-config");
require("dotenv").config();
const { ethers, network } = require("hardhat");
const fs = require("fs");

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating frontend...");
        await updateContractAddresses();
        await updateABI();
        // console.log("Frontend Updated!");
    }
};

async function updateABI() {
    const talentsPool = await ethers.getContract("TalentsPool");
    fs.writeFileSync(
        `${frontEndABILocation}TalentsPool.json`,
        talentsPool.interface.format(ethers.utils.FormatTypes.json)
    );

    const talentBadge = await ethers.getContract("TalentBadge");
    fs.writeFileSync(
        `${frontEndABILocation}TalentBadge.json`,
        talentBadge.interface.format(ethers.utils.FormatTypes.json)
    );
}

async function updateContractAddresses() {
    const talentsPool = await ethers.getContract("TalentsPool");
    const chainId = network.config.chainId.toString();
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"));
    const curAddress = talentsPool.address;
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["TalentsPool"].includes(curAddress)) {
            contractAddresses[chainId]["TalentsPool"].push(curAddress);
        }
    } else {
        contractAddresses[chainId] = { TalentsPool: [curAddress] };
    }

    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
    
    const talentsBadge = await ethers.getContract("TalentsBadge");
    const badgeContractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"));
    const curBadgeAddress = talentsBadge.address;
    if (chainId in badgeContractAddresses) {
        if (!badgeContractAddresses[chainId]["TalentsBadge"].includes(curBadgeAddress)) {
            badgeContractAddresses[chainId]["TalentsBadge"].push(curBadgeAddress);
        }
    } else {
        badgeContractAddresses[chainId] = { TalentsBadge: [curBadgeAddress] };
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(badgeContractAddresses));
}

module.exports.tags = ["all", "frontend"];
