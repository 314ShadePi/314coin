const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
	"3c541bbdde73f35ad60605e3219f9d16b32f0bc06c0787c2e4c79285eeda27f5"
);
const myWalletAddress = myKey.getPublic("hex");

let coin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 10);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log("\n Starting miner...");
coin.minePendingTransactions(myWalletAddress);

console.log(
	"\n Balance of 314-MAIN-REW is: " + coin.getBalanceOfAddress(myWalletAddress)
);
console.log("Is chain valid? " + coin.IsChainValid());
coin.chain[1].transactions[0].amount = 1;
console.log("Is chain valid? " + coin.IsChainValid());
