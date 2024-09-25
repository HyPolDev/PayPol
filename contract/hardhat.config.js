require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",  // or whatever version you're using
  networks: {
    holesky: {
      url: `${process.env.HOLESKY_API_KEY}`, // replace with your Goerli RPC URL
      accounts: [process.env.ETHSCAN_API_KEY] // Add your wallet private key here (without the "0x" prefix)
    },
    etherscan: {
      apiKey: `${ethScanAPI}` // optional for contract verification
    },
  }
};