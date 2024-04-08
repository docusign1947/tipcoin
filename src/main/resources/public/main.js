const { Alchemy, Network } = require("alchemy-sdk");
const config = {
  apiKey: "4WQ7xzUSL6FrdYQbQi_YomOqEBRfIjLB",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);
const main = async () => {
    // Wallet address
    const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  
    // Get token balances
    const balances = await alchemy.core.getTokenBalances(address);
  
    // Remove tokens with zero balance
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });
  
    console.log(`Token balances of ${address} \n`);
  
    // Counter for SNo of final output
    let i = 1;
  
    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;
  
      // Get metadata of token
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
  
      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);
  
      // Print name, balance, and symbol of token
      console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
    }
  };
  
  const runMain = async () => {
    try {
      await main();
    } catch (error) {
      console.log(error);
    }
  };
  
  runMain();

// const main = async () => {
//   // Wallet address
//   const address = "0x9560Ce23D63d199C0C3F5aB5e581Fdd866ea5dEc";

//   // Get token balances
//   const balances = await alchemy.core.getTokenBalances(address);

//   console.log(`The balances of ${address} address are:`, balances);
// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// runMain();
