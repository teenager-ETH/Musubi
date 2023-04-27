const pinataSDK = require("@pinata/sdk");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// get the API keys from the .env file
const pinataAPIKey = process.env.PINATA_API_KEY;
const pinataAPISecret = process.env.PINATA_API_SECRET;
const pinata = new pinataSDK(pinataAPIKey, pinataAPISecret);

// store the images to Pinata
async function storeImages(imagesFilePath) {
    const fullImagesFilePath = path.resolve(imagesFilePath); // get absolute paths
    const files = fs.readdirSync(fullImagesFilePath); // get all files in the directory
    console.log("upload the badge images to the Pinata");
    let responses = []; // store the hashes from the Pinata to add to the metadata
    for (fileIndex in files) {
        console.log("Processing file:", files[fileIndex]); // print the file name
        const readableStreamForFile = fs.createReadStream(
            `${fullImagesFilePath}/${files[fileIndex]}`
        );
        const options = {
            pinataMetadata: {
                name: files[fileIndex],
            },
        };
        try {
            await pinata
                .pinFileToIPFS(readableStreamForFile, options)
                .then((result) => {
                    console.log("Uploaded file:", files[fileIndex], "Result:", result);
                    responses.push(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }
    return { responses, files };
}

async function storeBadgeURIMetadata(metadata) {
    const options = {
        pinataMetadata: {
            name: metadata.name,
        },
    };
    try {
        const response = await pinata.pinJSONToIPFS(metadata, options);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = { storeImages, storeBadgeURIMetadata };
