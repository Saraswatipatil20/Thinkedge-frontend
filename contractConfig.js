export const contractAddress = "0xf4513d1561d6577845e08c36b98141559e84dc38"; // Replace with actual deployed contract address

export const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "string", "name": "tokenURI", "type": "string" }
    ],
    "name": "mintCertificateNFT",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
