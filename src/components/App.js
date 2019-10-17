import React, { Component } from 'react';
import Navbar from "./Navbar"
import './App.css';
import Web3 from 'web3'
import Main from './YourTokens'
import YourTokens from './YourTokens'
import YourColors from './YourColors'
import CryptoColors from '../abis/CryptoColors'
import { Spinner } from 'react-bootstrap';
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
        let supply = await this.state.contract.methods.totalSupply().call()
        balance = balance / 1000000000000000000;
        let mainAccount = await this.state.contract.methods.mainPerson().call();
        let colorsCount = await this.state.contract.methods.colorsCount().call()
        let getTime = await this.state.contract.methods.getTime().call()

        if(getTime<1000000000000000) {
            getTime = getTime.toNumber()
            let hours = Math.floor(getTime/3600)
            let minutes = Math.floor((getTime-(hours*3600))/60)
            let secounds = getTime-(hours*3600)-(minutes*60);
            let time = hours + ':' + minutes + ':' + secounds;
            this.setState({time});
        }



        if(mainAccount === account) {
            this.setState({mainAccount: true})
        } else {
            this.setState({mainAccount: false})
        }
        this.setState({account: account,
        accountShort: accountShort,
            balance: balance,
            loading: false,
            colorsCount: colorsCount,
            colors: [],
            person: [],
            numberTest: 0,
            personColors: []

        });
        let peopleItemsCount=await this.state.contract.methods.peopleItemsCount(this.state.account).call();
        peopleItemsCount=peopleItemsCount.toNumber();


        for(let i=1; i<=this.state.colorsCount; i++) {
            let item = await this.state.contract.methods.colors(i).call();
                this.setState({colors : [...this.state.colors, item]})

        }



        for(let z=0; z<peopleItemsCount;z++) {

            let person = await this.state.contract.methods.people(this.state.account, z).call();
            person = person.toNumber()
            console.log(person)
            console.log(this.state.colors[2])
            if(person!=0) {
                if(this.state.colors[person-1].owner===this.state.account) {
                    this.setState({ personColors : [...this.state.personColors, this.state.colors[person-1]]})
                    console.log(this.state.colors[person-1].color)
                }
            }



        }
        console.log(this.state.personColors);



    }
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
    async sellColor(id,price) {
        await this.state.contract.methods.sellColor(id,price).send({from: this.state.account}, (error, result) => {
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
                      ? <div className="d-flex halfDivided align-items-stretch ">
                          <>
                          <div className="container mt-5">
                              <h1 className="text-center display-1 mb-3">Loading...</h1>
                              <div className="row justify-content-between">
                          <div className="spinner-grow text-primary" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                          <div className="spinner-grow text-success" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                          <div className="spinner-grow text-danger" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                          <div className="spinner-grow text-warning" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                          <div className="spinner-grow text-info" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                          </div>
                          </div>
                      </></div>
                  : <Switch>
                          <Route exact path="/YourTokens">
                              <YourTokens balance={this.state.balance}
                                          account={this.state.accountShort}
                                          buyTokens={this.buyTokens.bind(this)}
                                          transfer={this.transfer.bind(this)}
                                          transferFrom={this.transferFrom.bind(this)}
                                          approve={this. approve.bind(this)}/>
                          </Route>
                          <Route exact path="/YourColors" >
                          <YourColors  account={this.state.accountShort}
                                       mainAccount={this.state.mainAccount}
                                       balance={this.state.balance}
                                       addColor={this.addColor.bind(this)}
                                       time={this.state.time}
                                       colors={this.state.colors}
                                       buyColor={this.buyColor.bind(this)}
                                       sellColor={this.sellColor.bind(this)}
                                       personColors={this.state.personColors}
                                       numberItems={this.state.numberTest}
                          />
                          </Route>
                          <Route path="/" component={MyDefaultComponent} />
                      </Switch>}

                  </div>
          </Router>
      );
    }
  }




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
