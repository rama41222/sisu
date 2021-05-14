# Getting Started with Create React App

### Running locally

1. Compile the smart contract
```bash
 npx hardhat compile                         
```
2. Start a local node

```bash
npx hardhat node
```
3. Deploy the smart contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```
4. Set the smart contract address to the ui

```bash
greeterAddress = 'smart contract address'
```
5. Run the react UI
```bash
npm run start
```   
6. Open chrome and connect the app to the wallet (set network = localhost:8545)
7. Import the account by private key
8. Perform Transactions


### Running on Ropsten

1. Deploy this to ropsten
```bash
npx hardhat run scripts/deploy.js --network ropsten
```
