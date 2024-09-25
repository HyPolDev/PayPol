require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");


module.exports = {
  solidity: "0.8.17",  // or whatever version you're using
  networks: {
    holesky: {
      url: `https://eth-holesky.g.alchemy.com/v2/VX515JnRGSQ-3oUQzAzY7fERaDszAn1-`, // replace with your Goerli RPC URL
      accounts: ["0e8ca0d61b3785b04876e2a107ec05104243d59270a0d3277856ee3d4865669e"] // Add your wallet private key here (without the "0x" prefix)
    }
  }
};
