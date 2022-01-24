export const PiggyBankArtifact = {
  address:{
      4: '0x446712f69838008439e86200BdAE735425242A18' // contract address in rinkeby red
  },
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DepositEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "WithdrawEvent",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
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
      "name": "getTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "depositorAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "typeTransaction",
              "type": "uint256"
            }
          ],
          "internalType": "struct PiggyBank.Transaction[]",
          "name": "",
          "type": "tuple[]"
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
      "name": "transactionsHistory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "depositorAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "typeTransaction",
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]
}