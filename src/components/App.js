import React, { Component } from 'react';
import Navbar from "./Navbar"
import './App.css';
import Web3 from 'web3'
import Main from './Main'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class App extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadAccount();
        await this.loadContract();
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
        const account = await window.web3.eth.getAccounts();
        this.setState({account: account[0]});
    }
    async loadContract() {
        const networkId = await window.web3.eth.net.getId();
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
                      <Route exact path="/YourTokens" component={YourTokens} />
                      <Route exact path="/YourColors" component={YourColors} />
                      <Route path="/" component={MyDefaultComponent} />
                  </Switch>
                  </div>
          </Router>
      );
    }
  }
  function YourTokens() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }

  function YourColors() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }

  function MyDefaultComponent() {
    return (
  <>
      <div className="d-flex halfDivided align-items-stretch ">
      <Link to="/YourTokens" className=" col-md-6 d-flex justify-content-center align-items-center">
            <h1 className="display-md-2 display-3 a text-center">Your Tokens</h1>
      </Link>

        <Link to="/YourColors" className=" col-md-6 d-flex justify-content-center align-items-center">
            <h1 className="display-md-2 display-3 a text-center">Your Colors</h1>
         </Link>
      </div>
  </>
    );
  }
export default App;
