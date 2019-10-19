import React, { Component } from 'react';
import Navbar from "./Navbar"
import './App.css';
import Web3 from 'web3'
import YourTokens from './YourTokens'
import YourColors from './YourColors'
import CryptoColors from '../abis/CryptoColors'
import Loading from "./Loading";

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

    //Provide web3 to app
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

    //Loading data from web3 and contract (everything that is needed for app to work well)
    async loadAccount() {
        let account = await window.web3.eth.getAccounts();
        account = account[0];
        let accountShort = account.substring(0,6);
        let balance = await this.state.contract.methods.balanceOf(account).call();
        let supply = await this.state.contract.methods.tokensLeft().call()
        balance = balance / 1000000000000000000;
        let mainAccount = await this.state.contract.methods.mainPerson().call();
        let colorsCount = await this.state.contract.methods.colorsCount().call()
        let getTime = await this.state.contract.methods.getTime().call()

        //checking and setting hours:minutes:secound to next color
        if(getTime<900) {
            getTime = getTime.toNumber()
            let hours = Math.floor(getTime/3600)
            let minutes = Math.floor((getTime-(hours*3600))/60)
            let secounds = getTime-(hours*3600)-(minutes*60);
            if(hours<10) {
                hours = '0'+hours;
            }
            if(secounds<10) {
                secounds = '0'+secounds;
            }
            if(minutes<10) {
                minutes = '0'+minutes;
            }
            let time = hours + ':' + minutes + ':' + secounds;

            this.setState({time});
        } else {
            let time = 'New color can be added';
            this.setState({time});
        }
        //Checking if deployer of the contract is currently connected
        if(mainAccount === account) {
            this.setState({mainAccount: true})
        } else {
            this.setState({mainAccount: false})
        }
        supply = supply/1000000000000000000;
        supply = supply.toString();
        this.setState({
            account: account,
            accountShort: accountShort,
            balance: balance,
            loading: false,
            colorsCount: colorsCount,
            colors: [],
            person: [],
            numberTest: 0,
            personColors: [],
            supply: supply
        });

        let peopleItemsCount=await this.state.contract.methods.peopleItemsCount(this.state.account).call();
        peopleItemsCount=peopleItemsCount.toNumber();
        this.setState({peopleItemsCount});

        for(let i=0; i<this.state.colorsCount; i++) {
            let item = await this.state.contract.methods.colors(i).call();
            this.setState({colors : [...this.state.colors, item]})

        }
        for(let z=0; z<peopleItemsCount;z++) {
            let person = await this.state.contract.methods.people(this.state.account, z).call();
            person = person.toNumber();
            this.setState({ person : [...this.state.person, person]});
            this.setState({ personColors : [...this.state.personColors, this.state.colors[person]]})
        }
    }

        //Loading contract data
        async loadContract() {
            const networkId = await window.web3.eth.net.getId();
            const networkData = await CryptoColors.networks[networkId];
            if(networkData) {
                const contract = await window.web3.eth.Contract(CryptoColors.abi, networkData.address);
                this.setState({contract});
            } else {
                alert('Connect to another network')
            }
        }

        //Functions section
        async sellColor(id,price) {
            await this.state.contract.methods.sellColor(id,price).send({from: this.state.account}, (error, result) => {
                if(result!=null){
                    this.checkBlockNumber();
                }
            });
        }
        async buyTokens(amout) {
            await this.state.contract.methods.buyTokens().send({from: this.state.account, value: amout}, (error, result) => {
                if(result!=null){
                    this.checkBlockNumber();
                }
            });
        }
        async transfer(address,amout) {
            await this.state.contract.methods.transfer(address,amout).send({from: this.state.account}, (error, result) => {
                if(result!=null){
                    this.checkBlockNumber();
                }
            });
        }
        async transferFrom(addressFrom, addressTo, amout) {
            await this.state.contract.methods.transferFrom(addressFrom, addressTo, amout).send({from: this.state.account}, (error, result) => {
                if(result!=null){
                    this.checkBlockNumber();
                }
            });
        }
        async approve(address,ammout) {
            await this.state.contract.methods.approve(address,ammout).send({from: this.state.account}, (error, result) => {
                if(result!=null){
                    this.checkBlockNumber();
                }
            });
        }
        async addColor(color,price) {
            await this.state.contract.methods.addColor(color,price).send({from: this.state.account}, (error, result) => {
                if(result!=null){
                    this.checkBlockNumber();
                }
            });
        }

        async buyColor(id) {
            await this.state.contract.methods.buyColor(id).send({from: this.state.account}, (error, result) => {
                if(result!=null){
                    this.checkBlockNumber();
                }
            });
        }
    //Function that checks if transaction is done
    async checkBlockNumber() {
        this.setState({loading:true});
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        };
        const blockNumber = await window.web3.eth.getBlockNumber();
        let blockNumberNew = await window.web3.eth.getBlockNumber();
        while(blockNumber === blockNumberNew) {
            blockNumberNew = await window.web3.eth.getBlockNumber();
            await sleep(100);
        }
        await this.loadAccount();
        this.setState({loading:false});
    }


    constructor(props) {
        super(props);
        this.state = {
            account: null,
            loading: true
        }
    }

    render() {
      return (
          <Router>
              <div className="mainDiv">
                  <Navbar account={this.state.account} />
                  {this.state.loading
                      ? <Loading/>
                      : <Switch>
                          <Route exact path="/YourTokens">
                              <YourTokens balance={this.state.balance}
                                          account={this.state.accountShort}
                                          buyTokens={this.buyTokens.bind(this)}
                                          transfer={this.transfer.bind(this)}
                                          transferFrom={this.transferFrom.bind(this)}
                                          approve={this.approve.bind(this)}
                                          supply={this.state.supply}
                              />
                          </Route>
                          <Route exact path="/YourColors" >
                              <YourColors account={this.state.accountShort}
                                          accountLong={this.state.account}
                                          mainAccount={this.state.mainAccount}
                                          balance={this.state.balance}
                                          addColor={this.addColor.bind(this)}
                                          time={this.state.time}
                                          colors={this.state.colors}
                                          buyColor={this.buyColor.bind(this)}
                                          sellColor={this.sellColor.bind(this)}
                                          personColors={this.state.personColors}
                                          numberItems={this.state.numberTest}
                                          peopleItemsCount={this.state.peopleItemsCount}
                                          person={this.state.person}
                              />
                          </Route>
                          <Route path="/" component={MyDefaultComponent} />
                      </Switch>}
                  </div>
          </Router>
      );
    }
  }
        //Default component on the page (it is important because we dont want new components to be added below)
      function MyDefaultComponent() {
        return (
          <>
              <div className="halfDivided align-items-stretch m-0">
                  <h1 className="display-3 a text-center pt-5 pb-5 text-white">Website about collecting</h1>
                  <div className="d-none d-md-flex align-items-stretch pt-5 mt-5">
                      <div className="col-1"></div>
                    <Link to="/YourTokens" className="col-5 d-flex justify-content-around align-items-around aClass">
                      <h1 className=" display-1 a text-center  font-weight-bold mt-5">Your Tokens</h1>
                    </Link>
                    <Link to="/YourColors" className="col-5 d-flex justify-content-center align-items-center aClass">
                        <h1 className=" display-1 a text-center font-weight-bold mt-5">Your Colors</h1>
                    </Link>
                  </div>
                  <div className=" d-md-none align-items-stretch pt-5 mt-5">
                      <Link to="/YourTokens" className=" col-12 d-flex justify-content-center align-items-center aClass mb-3">
                          <h1 className=" display-3 a text-center  font-weight-bold">Your Tokens</h1>
                      </Link>
                      <Link to="/YourColors" className=" col-12 d-flex justify-content-center align-items-center aClass">
                          <h1 className=" display-3 a text-center font-weight-bold m-2">Your Colors</h1>
                      </Link>
                  </div>
              </div>
          </>
        );
      }
export default App;
