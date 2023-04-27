const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const ecies25519 =  require("@kumarargentra/ecies-25519");
const { BigNumber } = require("ethers");
const { keccak256, toUtf8Bytes } = require("ethers/lib/utils");

describe("Attest", function () {
        let Attest, Unirep, recuiter, attester, employer;
        beforeEach(async function () {
            accounts = await ethers.getSigners();
            recuiter = accounts[0];
            //   await deployments.fixture(["all"]);
            // Unirep = await deployUnirep(accounts[0])
            console.log(recuiter, attester, employer)
            const AttestContractFactory = await ethers.getContractFactory("Attest"); // default account is deployer
            Attest = await AttestContractFactory.connect(recuiter).deploy('0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e')
            await Attest.deployed()
        });
        it("should create Job", async function () {
            const fromHexString = hexString =>
            new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

            const jd = 'A great Job'
            const kp = ecies25519.generateKeyPair();
            const pkint = BigNumber.from(kp.publicKey)
            const hash = toUtf8Bytes('1'+jd+pkint.toString())
            console.log(hash)
            await Attest.connect(recuiter).createJob([
                keccak256(hash),
                1,
                jd,
                pkint.toBigInt(),
            ])
            const jobs = await Attest.getJobs(recuiter.address);
            const job = await Attest.job(jobs[0])
            console.log(jobs, job)
            expect(job.key).to.equal(pkint.toHexString())

        });
    });
