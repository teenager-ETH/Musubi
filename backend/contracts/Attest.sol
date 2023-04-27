// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Unirep/Unirep.sol";
import "./Unirep/interfaces/IUnirep.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


error QuestionIdAlreadyClaimed(uint256 identityCommitment, uint256 qid);
error LevelTooLow();
contract Attest is Ownable, IUnirep {
    mapping(uint => mapping(uint => bool)) public attestRecord; //commitment=>qid=>if attest
    Unirep private unirep;
    uint256 public constant EPOCH_LENGTH = 300;
    mapping(address => uint[]) public jobs;
    mapping(uint => Job) public job;
    mapping(uint => Application[]) public application; // job idx->application list
    uint[] public jobPool;
    struct Job {
        uint idx;
        uint lvReq;
        string desp;
        uint key; // for ecies-ed25515
    }

    struct Application {
        uint target;
        bytes secret;
    }

    constructor(address _unirep) {
        unirep = Unirep(_unirep);
        unirep.attesterSignUp(EPOCH_LENGTH);
    }

    function createJob(Job memory _job) public {
        jobPool.push(_job.idx);
        jobs[msg.sender].push(_job.idx);
        job[_job.idx] = _job;
    }

    function createApplication(
        Application memory _application,
        uint _jobIdx,
        uint256[] memory publicSignals,
        uint256[8] memory proof
    ) public {
        ReputationSignals memory _sigs = unirep.decodeReputationSignals(publicSignals);
        if(_sigs.minRep < job[_jobIdx].lvReq){
            revert LevelTooLow();
        }
        unirep.verifyReputationProof(publicSignals, proof);

        application[_jobIdx].push(_application);
    }

    function getJobs(address _user) public view returns(uint[] memory){
        return jobs[_user];
    }

    function getJobPool() public view returns(uint[] memory){
        return jobPool;
    }

    function getApplication(uint _idx) public view returns(Application[] memory){
        return application[_idx];
    }

    function userSignUp(uint256[] memory publicSignals, uint256[8] memory proof) public onlyOwner {
        unirep.userSignUp(publicSignals, proof);
    }

    function sealEpoch(
        uint256 epoch,
        uint256[] memory publicSignals,
        uint256[8] memory proof
    ) public onlyOwner {
        unirep.sealEpoch(epoch, uint160(address(this)), publicSignals, proof);
    }

    function userStateTransition(
        uint256[] memory publicSignals,
        uint256[8] memory proof
    ) public onlyOwner {
        unirep.userStateTransition(publicSignals, proof);
    }

    function attest(uint epochKey, uint qid, uint commitment) public onlyOwner {
        if (attestRecord[commitment][qid]) {
            revert QuestionIdAlreadyClaimed(commitment, qid);
        }
        attestRecord[commitment][qid] = true;
        uint targetEpoch = unirep.attesterCurrentEpoch(uint160(address(this)));
        unirep.attest(epochKey, targetEpoch, 0, 1);
    }
}
