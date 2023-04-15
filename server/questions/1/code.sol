// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DecentralizedBanktoAttack {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint256 bal = balances[msg.sender];
        require(bal > 0);

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

contract AttackChallenge {
    DecentralizedBanktoAttack public decentralizedBanktoAttack;

    constructor(address _decentralizedBanktoAttackAddress) {
        decentralizedBanktoAttack = DecentralizedBanktoAttack(
            _decentralizedBanktoAttackAddress
        );
    }

    // You can implement the attack() and related neccessary function here
    ////////////////////////////////////////////

    fallback() external payable {

    }

    function attack() external payable {

    }

    ////////////////////////////////////////////

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
