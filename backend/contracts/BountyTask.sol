// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract BountyTask {
    address public owner;
    uint256 public taskId;
    string public title;
    string public description;
    uint256 public reward;
    address public talent;
    bool public isCompleted;

    event TaskAccepted(uint256 indexed taskId, address indexed talent);
    event TaskCompleted(uint256 indexed taskId);

    constructor(
        address taskOwner,
        uint256 taskNumber,
        string memory taskTitle,
        string memory taskDescription,
        uint256 taskReward
    ) {
        owner = taskOwner;
        taskId = taskNumber;
        title = taskTitle;
        description = taskDescription;
        reward = taskReward;
        isCompleted = false;
    }

    function acceptTask() public {
        require(talent == address(0), "Task already accepted");
        talent = msg.sender;
        emit TaskAccepted(taskId, msg.sender);
    }

    function completeTask() public {
        require(msg.sender == owner, "Only owner can mark the task as completed");
        require(!isCompleted, "Task already completed");
        require(talent != address(0), "Task not accepted yet");

        isCompleted = true;
        // transfer reward to the talent
        payable(talent).transfer(reward);

        emit TaskCompleted(taskId);
    }

    // Getters
    function getStatus() public view returns (bool) {
        return isCompleted;
    }
}
