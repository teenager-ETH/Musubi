// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./BountyTask.sol";

contract BountyFactory {
    uint256 private taskIdCounter;
    mapping(uint256 => address) public tasks;

    event BountyTaskCreated(address indexed taskAddress, uint256 indexed taskId);

    function createBountyTask(
        string memory title,
        string memory description,
        uint256 reward
    ) external {
        taskIdCounter++;
        BountyTask newTask = new BountyTask(msg.sender, taskIdCounter, title, description, reward);
        tasks[taskIdCounter] = address(newTask);
        emit BountyTaskCreated(address(newTask), taskIdCounter);
    }

    // Add functions for managing the bounty tasks
}
