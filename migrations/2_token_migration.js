var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSales = artifacts.require("./MyTokensale.sol");
var MyKyc =artifacts.require("./KycContract.sol");
require('dotenv').config({path:'../.env'});
module.exports = async function(deployer) {
 let addr = await web3.eth.getAccounts();
 await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
 await deployer.deploy(MyKyc);
await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address,MyKyc.address);
 let tokenInstance = await MyToken.deployed();
 await tokenInstance.transfer(MyTokenSales.address, process.env.INITIAL_TOKENS);
};
