// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Unirep/Unirep.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error QuestionIdAlreadyClaimed(uint256 identityCommitment,uint256 qid);

contract Attest is Ownable {
    mapping(uint=>mapping(uint=>bool)) public attestRecord; //commitment=>qid=>if attest
    Unirep private unirep;
    uint public constant EPOCH_LENGTH = 60*15;
    constructor(address _unirep){
        unirep = Unirep(_unirep);
        unirep.attesterSignUp(EPOCH_LENGTH);
    }

    function userSignUp(uint256[] memory publicSignals, uint256[8] memory proof) public onlyOwner{
        unirep.userSignUp(publicSignals, proof);
    }
    
    function userStateTransition(
        uint epoch,
        uint256[] memory publicSignals, uint256[8] memory proof,
        uint256[] memory orderedTreePublicSignals, uint256[8] memory orderedTreeProof) public onlyOwner{
        unirep.sealEpoch(epoch, uint160(address(this)), orderedTreePublicSignals, orderedTreeProof);
        unirep.userStateTransition(publicSignals, proof);
    }

    function attest(uint epochKey, uint qid, uint commitment) public onlyOwner{
        if (attestRecord[commitment][qid]){
            revert QuestionIdAlreadyClaimed(commitment, qid);
        }
        attestRecord[commitment][qid] = true;
        uint targetEpoch = unirep.attesterCurrentEpoch(uint160(address(this)));
        unirep.attest(epochKey,targetEpoch,0,1);
    }
}