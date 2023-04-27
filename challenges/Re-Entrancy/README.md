# Getting Started

## Requirements

Using Yarn instead of npm
You'll know you've installed yarn right if you can run:
yarn --version and get an output like: x.x.x
You might need to install it with npm

## Quickstart

```
git clone
cd challenges/Re-Entrancy
yarn
```

# Usage

Deploy:

```
yarn hardhat deploy
```

## Testing

```
yarn hardhat test
```

Test will be used to judge if a talent candidate pass the test.

## Challenges

# Re-Entrancy Instructions

The first question tests whether the interviewee can design AttackChallenge.sol to attack based on the DecentralizedBanktoAttack.sol contract. The requirements and the parts that need to be written are annotated in AttackChallenge.sol. Use attack.test.js to test whether it passes.

The second question tests whether the interviewee can improve the DecentralizedBanktoAttack.sol contract to make it unbreakable. We show the interviewee DecentralizedBanktoAttack.sol and ask them to modify it to make it secure, but here it has been renamed DecentralizedBankFixChallenge.sol, and the DecentralizedBankFixChallenge.sol in the contracts folder is the completed question, containing two correct answers. Use defend.test.js to test whether it passes.
