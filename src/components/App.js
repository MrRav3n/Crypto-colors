import React, { Component } from 'react';
import Navbar from "./Navbar"
import './App.css';
import Web3 from 'web3'
import Main from './YourTokens'
import YourTokens from './YourTokens'
import CryptoColors from '../abis/CryptoColors'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadContract();
        await this.loadAccount();
        window.ethereum.on('accountsChanged', async (accounts)  => {
          await this.loadAccount();
        })
    }
    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    async loadAccount() {
        let account = await window.web3.eth.getAccounts();
        account = account[0];
        let accountShort = account.substring(0,6);
        let balance = await this.state.contract.methods.balanceOf(account).call();
        balance = balance /1000000000000000000;
        this.setState({account: account,
        accountShort: accountShort,
            balance: balance.toString()
        });
        console.log(balance);
    }
    async loadContract() {
        const networkId = await window.web3.eth.net.getId();
        const networkData = await CryptoColors.networks[networkId];
        if(networkData) {
            const contract = await window.web3.eth.Contract(CryptoColors.abi, networkData.address);
            this.setState({contract});
            console.log(contract)
        } else {
            console.log('Connect to network')
        }
    }
    async BuyTokens(ammout) {
        await this.state.contract.methods.buyTokens().send({from: this.state.account, value: ammout})
            .once('receipt', (receipt) => {
            console.log("123");
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            account: null,
        }
    }

    render() {
      return (
          <Router>
              <div className="mainDiv">
                  <Navbar account={this.state.account} />
                  <Switch>
                      <Route exact path="/YourTokens">
                          <YourTokens balance={this.state.balance} account={this.state.accountShort} buyTokens={this.BuyTokens.bind(this)} />
                      </Route>
                      <Route exact path="/YourColors" component={YourColors} />
                      <Route path="/" component={MyDefaultComponent} />
                  </Switch>
                  </div>
          </Router>
      );
    }
  }


  class YourColors extends React.Component {
    render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );

    }
  }

  function MyDefaultComponent() {
    return (
  <>
      <div className="d-flex halfDivided align-items-stretch ">
      <Link to="/YourTokens" className="col d-flex justify-content-center align-items-center aClass">
            <h1 className="display-md-2 display-3 a text-center">Your Tokens</h1>
      </Link>

        <Link to="/YourColors" className="col d-flex justify-content-center align-items-center aClass">
            <h1 className="display-md-2 display-3 a text-center">Your Colors</h1>
         </Link>
      </div>
  </>
    );
  }
export default App;
