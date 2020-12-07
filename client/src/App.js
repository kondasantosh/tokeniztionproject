import React, { Component } from "react";
import KycContracts from "./contracts/KycContract.json";
import Token from "./contracts/MyToken.json";
import TokenSale from "./contracts/MyTokenSale.json";
import getWeb3 from "./getWeb3";
import "./odometer.css"
import Odometer from "react-odometerjs";
import "./App.css";

class App extends Component {
  state = { Loaded:false,kycAddress:"0x123",tokensaleaddress:null,usertoken:0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.TokenInstance = new this.web3.eth.Contract(
        Token.abi,
        Token.networks[this.networkId]&& Token.networks[this.networkId].address,
      );

      this.TokensaleInstance= new this.web3.eth.Contract(
        TokenSale.abi,
        TokenSale.networks[this.networkId]&& TokenSale.networks[this.networkId].address,
      );

      this.KycContractsinstance=new this.web3.eth.Contract(
        KycContracts.abi,
        KycContracts.networks[this.networkId]&&KycContracts.networks[this.networkId].address,
      );
     this.ListenToTokensTransfer();
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      
      this.setState({ Loaded:true, tokensaleaddress:TokenSale.networks[this.networkId].address},this.updateusertoken );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  handleInputChange = async(event)=>{
    const target= event.target;
    const value =target.type === "checkbox" ? target.checked: target.value;
    const name=target.name;
    this.setState({[name]:value})
  }

  handleKycWhiteListing= async ()=>{
    await this.KycContractsinstance.methods.setKycCompleted(this.state.kycAddress).send({from:this.accounts[0]});
    alert("KYC for" +this.state.kycAddress+"   it is completed ");
  }
  handleBuyToken = async () => {
    await this.TokensaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: 1});
    }

    updateusertoken= async ()=>{
      let userstoken=await this.TokenInstance.methods.balanceOf(this.accounts[0]).call();
      this.setState({usertoken:userstoken});
    }

    ListenToTokensTransfer=async ()=>{
      await this.TokenInstance.events.Transfer({to:this.accounts[0]}).on("data",this.updateusertoken);
   }

 
  
  render() {
    if (!this.state.Loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>
        <div className="header">
        <div  style={{ width:1200,display: "flex", flexDirection: "row" }}>
          <div style={{ flexGrow:1 }}></div>
          <div class="header__item">
          <div class="header__label">&nbsp;</div>
          <div class="header__value lang">
            <div>Explore</div>
            <ul>
              <li>
                <a href="https://cyberchain.cc/" target="_blank">
                  CyberChain
                </a>
              </li>
              <li>
                <a href="https://uswap.me/" target="_blank">
                  Uswap
                </a>
              </li>
              <li>
                <a href="https://ume.finance/" target="_blank">
                  Ume.Finance
                  </a>
              </li>
              <li>
                <a href="https://eclipcity.io/" target="_blank">
                  Eclipcity
                </a>
              </li>
              </ul>
              </div>
            </div>
          <div class="header__item">
          <div class="header__label">System language</div>
          <div class="header__value lang">
            <div><img src="./trx/en.svg"/>English</div>
            <ul>
              <li>
                <a>
                <img src="./trx/en.svg"/>english
                </a>
              </li>
              <li>
                <a>
                <img src="./trx/es.svg"/>spanish
                </a>
              </li>
              <li>
                <a>
                <img src="./trx/ru.svg"/>Russia
                </a>
              </li>
              <li>
                <a>
                <img src="./logos/zh.svg"/>china
                </a>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
        <section className="Section1">
        <h1>Mc Duck Cappucino Token</h1>
        <p>Get Your Tokens Today!</p>
        <h2>Kyc Whitelisting</h2>
       <span> Address to allow: </span><input type= "text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange}/>
        <button type="button" onClick={this.handleKycWhiteListing}>Adding to whitelist</button>
        <h2>Buy Token</h2>
        <p>If you want to buy Token,sen money to this address:{this.state.tokensaleaddress} </p>
            <div className="container">
              <p className="container p">
              A financial system built on smart contract technology.
              <p className="container t">Open to all,transparent to all.</p>
              </p>
              <button type="button" onClick={this.handleBuyToken}>Buy Token</button>
              <p>Amount of tokens in your account shown below</p>
              <div className="counter-wrapper">
                <span>Cappu:</span>
                <div class="odometer odometer-auto-theme">
                <div class="odometer-inside">
                  <span class="odometer-digit">
                    <span class="odometer-digit-space">{this.state.usertoken} </span>
                    <span class="odometer-digit-inner">
                      <span class="odometer-ribbon">
                        <span class="odometer-ribbon-inner">
                          <span class="odometer-value"></span>
                        </span>
                      </span>
                    </span>
                  </span>
                  </div>
                </div>
              </div> 
              
              
              
            </div>       
        </section>
        
      </div>
      
        
        
        
       </div>
    );
  }
}

export default App;
