// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DecentralizedBankFixChallenge {
    mapping(address => uint256) public balances;

    // Here is the previous DecentralizedBanktoAttack.sol, you need to remove its vulnerability and make it secure.
    ////////////////////////////////////////////

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // Solution 1, move external call to the end
    function withdraw() public {
        uint256 bal = balances[msg.sender];
        require(bal > 0);

        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
    }

    // Solution 2, Mutex
    bool locked;

    function withdraw2() public {
        require(!locked, "Re-entrancy detected");
        locked = true;
        uint256 bal = balances[msg.sender];
        require(bal > 0);

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
        balances[msg.sender] = 0;
        locked = false;
    }

    ////////////////////////////////////////////

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
