// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract ChallengeSelection is VRFConsumerBaseV2 {
    event RequestSent(uint256 requestId);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus) public s_requests; /* requestId --> requestStatus */
    VRFCoordinatorV2Interface COORDINATOR;

    // // Challenge number
    // uint256 private s_challengeNumber;
    // // ChallengeDifficulty to Challenge Amount, there are 9 levels of difficulty, each level have different amount of challenges
    // mapping(uint256 => uint256) private s_challengeDifficultytoAmount; // might be really expensive, consider to use IPFS?

    // Chainlink VRF variables
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    // bytes32 private immutable i_keyHash;
    uint64 private immutable i_subId;
    bytes32 private immutable i_keyHash; // gasLane
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 9; // get 9 random words at once to save chainlink gas

    constructor(
        address vrfCoordinatorV2Address,
        uint64 subId,
        bytes32 keyHash,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2Address) {
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2Address);
        i_subId = subId; // to edit
        i_keyHash = keyHash; // to edit
        i_callbackGasLimit = callbackGasLimit;
    }

    // requestChallenge() is a function that requests a random challenge from Chainlink VRF
    function requestChallenge() public returns (uint256 requestId) {
        requestId = i_vrfCoordinator.requestRandomWords(
            i_keyHash,
            i_subId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        emit RequestSent(requestId);
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        emit RequestFulfilled(_requestId, _randomWords); // we can use this to get the random challenge from the challenge mapping
    }

    //  function requestRandomWords(
    // bytes32 keyHash,
    // uint64 subId,
    // uint16 requestConfirmations,
    // uint32 callbackGasLimit,
    // uint32 numWords
}
