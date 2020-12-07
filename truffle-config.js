const path = require("path");
require("dotenv").config({path:"./.env"}); 
const HDWalletProvider=require("@truffle/hdwallet-provider");
const AccountIndex=0; 

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host:"127.0.0.1",
      network_id: "*"
    },
    ganache_local:{
        provider:function(){
          return new HDWalletProvider(process.env.Mnemonics,"http://127.0.0.1:7545",AccountIndex)
        },
        network_id:5777
    },
    goeli_local:{
      provider:function(){
        return new HDWalletProvider(process.env.Mnemonics,"https://goerli.infura.io/v3/d36a21382b9d4d1999bc96716f832eb7",AccountIndex)
      },
      network_id:5
  }
  }, 
  compilers:{
    solc:{
      version:"^0.7.0",
    }
  }
};
