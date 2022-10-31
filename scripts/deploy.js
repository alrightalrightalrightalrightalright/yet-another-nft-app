const fs = require('fs');
const path = require('path');

const contracts = ["SwaggNFT"];

async function publishContract(contractName, chainId) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy();

  console.log(contractName + " contract address: " + contract.address);

  fs.copyFileSync(
    path.join(__dirname, "../artifacts/contracts/" + contractName + ".sol/" + contractName + ".json"), //source
    path.join(__dirname, "../src/contracts/" + contractName + ".json") // destination
  );

  // check if addresses.json already exists
  let exists = fs.existsSync(path.join(__dirname, "../src/contracts/addresses.json"));

  // if not, created the file
  if (!exists) {
    fs.writeFileSync(
      path.join(__dirname, "../src/contracts/addresses.json"),
      "{}"
    );
  }

  // update the addresses.json file with the new contract address
  let addressesFile = fs.readFileSync(path.join(__dirname, "../src/contracts/addresses.json"));
  let addressesJson = JSON.parse(addressesFile);

  if (!addressesJson[contractName]) {
    addressesJson[contractName] = {};
  }

  addressesJson[contractName][chainId] = contract.address;

  fs.writeFileSync(
    path.join(__dirname, "../src/contracts/addresses.json"),
    JSON.stringify(addressesJson)
  );
}

async function main() {
  const [deployer] = await ethers.getSigners();

  let networkData = await deployer.provider.getNetwork()
  console.log("Chain ID:", networkData.chainId);

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  for (cont of contracts) {
    await publishContract(cont, networkData.chainId);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


