const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
            console.log(this.index + "==" + this.hash + "==" + this.nonce);
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "0000/00/00", "Genesis block", "0"); // ALWAYS use ISO8601 for dates.
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            return true;
        }
    }

    cIsChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let coin = new Blockchain();
coin.addBlock(new Block(1, "2022/11/17", { amount: 4 } ));
coin.addBlock(new Block(2, "2022/11/17", { amount: 10 } ));

for (let i = 3; i <= 7; i++) {
    coin.addBlock(new Block(i, "2022/11/17", { amount: i / 16 * 314 / Math.random() * Math.random() }));
}

console.log(JSON.stringify(coin, null, 4));

console.log('Is blockchain valid? ' + coin.isChainValid());
console.log('c_Is blockchain valid? ' + coin.cIsChainValid());

coin.chain[2].data = { amount: 100000000 };
coin.chain[2].data = coin.chain[2].calculateHash();

console.log('Is blockchain valid? ' + coin.isChainValid());
console.log('c_Is blockchain valid? ' + coin.cIsChainValid());
