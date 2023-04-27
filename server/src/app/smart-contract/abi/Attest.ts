export const AttestAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_unirep",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint160",
        "name": "attester",
        "type": "uint160"
      }
    ],
    "name": "AttesterAlreadySignUp",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      }
    ],
    "name": "AttesterIdNotMatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AttesterInvalid",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint160",
        "name": "attester",
        "type": "uint160"
      }
    ],
    "name": "AttesterNotSignUp",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DoubleSeal",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EpochNotMatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EpochNotSealed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "IncorrectHash",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      }
    ],
    "name": "InvalidEpoch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidEpochKey",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "epochTreeRoot",
        "type": "uint256"
      }
    ],
    "name": "InvalidEpochTreeRoot",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidField",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidProof",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSignature",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "stateTreeRoot",
        "type": "uint256"
      }
    ],
    "name": "InvalidStateTreeRoot",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LevelTooLow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MaxAttestations",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoAttestations",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "nullilier",
        "type": "uint256"
      }
    ],
    "name": "NullifierAlreadyUsed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfRange",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "nullilier",
        "type": "bytes32"
      }
    ],
    "name": "ProofAlreadyUsed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "identityCommitment",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "qid",
        "type": "uint256"
      }
    ],
    "name": "QuestionIdAlreadyClaimed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "identityCommitment",
        "type": "uint256"
      }
    ],
    "name": "UserAlreadySignedUp",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epochKey",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fieldIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "change",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "Attestation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "epochLength",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "AttesterSignedUp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      }
    ],
    "name": "EpochEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      }
    ],
    "name": "EpochSealed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "leaf",
        "type": "uint256"
      }
    ],
    "name": "EpochTreeLeaf",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "leaf",
        "type": "uint256"
      }
    ],
    "name": "StateTreeLeaf",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "identityCommitment",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "leafIndex",
        "type": "uint256"
      }
    ],
    "name": "UserSignedUp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint160",
        "name": "attesterId",
        "type": "uint160"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "leafIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hashedLeaf",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nullifier",
        "type": "uint256"
      }
    ],
    "name": "UserStateTransitioned",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "EPOCH_LENGTH",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "application",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "target",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "secret",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "epochKey",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "qid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "commitment",
        "type": "uint256"
      }
    ],
    "name": "attest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "attestRecord",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "target",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "secret",
            "type": "bytes"
          }
        ],
        "internalType": "struct Attest.Application",
        "name": "_application",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "_jobIdx",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "publicSignals",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[8]",
        "name": "proof",
        "type": "uint256[8]"
      }
    ],
    "name": "createApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "idx",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lvReq",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "desp",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "key",
            "type": "uint256"
          }
        ],
        "internalType": "struct Attest.Job",
        "name": "_job",
        "type": "tuple"
      }
    ],
    "name": "createJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_idx",
        "type": "uint256"
      }
    ],
    "name": "getApplication",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "target",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "secret",
            "type": "bytes"
          }
        ],
        "internalType": "struct Attest.Application[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getJobPool",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getJobs",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "job",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "idx",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lvReq",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "desp",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "key",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "jobPool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "jobs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "publicSignals",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[8]",
        "name": "proof",
        "type": "uint256[8]"
      }
    ],
    "name": "sealEpoch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "publicSignals",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[8]",
        "name": "proof",
        "type": "uint256[8]"
      }
    ],
    "name": "userSignUp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "publicSignals",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[8]",
        "name": "proof",
        "type": "uint256[8]"
      }
    ],
    "name": "userStateTransition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]