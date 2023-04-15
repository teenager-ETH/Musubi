const { network } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const { storeImages, storeBadgeURIMetadata } = require("../utils/uploadToPinata");

const imagesFilePath = "./images";

const metadataTemplate = {
    name: "",
    level: "",
    description: "",
    image: "",
    since: "",
    attributes: [
        {
            credit: "",
            skills: [
                {
                    progamming: [
                        {
                            solidity: 2,
                            javascript: 1,
                        },
                    ],
                },
            ],
        },
    ],
};

let badgeURIs = [
    "https://example.com/badge/0",
    "https://example.com/badge/1",
    "https://example.com/badge/2",
];

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    if (process.env.UPLOAD_TO_PINATA == "true") {
        badgeURIs = await handleBadgeURIs();
    }

    // if (process.env.UPLOAD_TO_IPFS == "true") {
    //     toke;
    // }

    // To ensure the persistence of the NFT, we use three ways to store the NFT:
    // 1. Our own IPFS node
    // 2. Pinata
    // 3. NFT Storage

    log("-------------------------------------");
    log("Deploying TalentBadge...");

    // const badgeURIs = [
    //     "https://example.com/badge/0",
    //     "https://example.com/badge/1",
    //     "https://example.com/badge/2",
    // ];

    const args = [networkConfig[chainId]["mintFee"], badgeURIs];

    const talentBadge = await deploy("TalentBadge", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockchainConfirmations || 1,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verify contract on etherscan...");
        await verify(talentBadge.address, args);
    }

    // log("-------------------------------------");
};

async function handleBadgeURIs() {
    badgeURIs = [];
    // store the badge Image in the IPFS
    // store the metadata in the IPFS

    const { responses: imageUploadResponses, files } = await storeImages(imagesFilePath);

    for (let imageUploadResponseIndex in imageUploadResponses) {
        // create metadata
        // upload the metadata
        let badgeURIMetadata = { ...metadataTemplate }; // unpack the metadata template
        badgeURIMetadata.name = files[imageUploadResponseIndex].replace(".png", " web3 engineer");
        badgeURIMetadata.level = files[imageUploadResponseIndex].replace(".png", "");
        badgeURIMetadata.description = `A ${badgeURIMetadata.name}.`;
        badgeURIMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`;
        badgeURIMetadata.since = `ipfs://${imageUploadResponses[imageUploadResponseIndex].Timestamp}`;
        console.log(`Uploading ${badgeURIMetadata.name}...`);
        // store the JSON metadata in the Pinanta/IPFS
        const badgeURIMetadataUploadResponse = await storeBadgeURIMetadata(badgeURIMetadata);
        badgeURIs.push(`ipfs://${badgeURIMetadataUploadResponse.IpfsHash}`);
    }
    console.log("Badge URIs Uploaded");
    console.log(badgeURIs);

    return badgeURIs;
}

module.exports.tags = ["all", "talentBadge", "main"];
