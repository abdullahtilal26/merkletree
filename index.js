const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const whiteListO = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
];
const whiteListL = [
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
];

const leafNodesO = whiteListO.map((addr) => keccak256(addr));
const leafNodesL = whiteListL.map((addr) => keccak256(addr));

const merkleTreeO = new MerkleTree(leafNodesO, keccak256, { sortPairs: true });
const merkleTreeL = new MerkleTree(leafNodesL, keccak256, { sortPairs: true });

const rootHashO = merkleTreeO.getRoot();
const rootHashL = merkleTreeL.getRoot();

const merkleProofO = leafNodesO.map((addr) => merkleTreeO.getHexProof(addr));
console.log(leafNodesO);
console.log("------------merkle tree\n", merkleTreeO);
console.log("------------merkle tree\n", merkleTreeO.toString());
console.log("------------root\n", rootHashO.toString("hex"));
console.log(
  "------------proof\n",
  merkleProofO,
  merkleTreeO.getHexProof(leafNodesO[0])
);

console.log(
  merkleTreeO.verify(
    merkleTreeO.getHexProof(leafNodesO[0]),
    rootHashO.toString("hex"),
    keccak256("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
  )
);
