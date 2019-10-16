import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Navbar from "./Navbar";

class YourTokens extends React.Component {

    render() {
        return (
            <Router>
            <div>
                <div className="jumbotron container mb-0">
                    <h1 className="display-4 ">Hi {this.props.account}!</h1><h1 className="display-5"> <br />Your ballance is {this.props.balance} </h1>
                    <p className="lead font-weight-bolder">There you can safely buy,send and do anything you want with your local tokens</p>
                    <hr className="my-4" />
                </div>
                    <div className="container">
                        <div className="row">
                            <>
                            <Link to="/BuyTokens" className="col d-inline-block bg-success text-white rounded m-1 text-center">
                                <h1 className="mt-4">Buy Tokens</h1>
                            </Link>
                            <Link to="/TransferTokens" className="col d-inline-block bg-primary text-white rounded m-1 text-center">
                                <h1>Transfer Tokens</h1>
                            </Link>
                            <Link to="/TransferFromTokens" className="col d-inline-block bg-danger text-white rounded m-1 text-center">
                                <h1>Transfer From</h1>
                            </Link>
                            <Link to="/GiveAlowance" className="col d-inline-block bg-warning text-white rounded m-1 text-center" >
                                <h1 className="mt-4">Give Permit</h1>
                            </Link>
                            </>
                        </div>
                    </div>
                                <Switch>
                                    <Route exact path="/BuyTokens">
                                        <BuyTokens buyTokens={this.props.buyTokens}/>
                                    </Route>
                                    <Route exact path="/TransferTokens">
                                        <TransferTokens transfer={this.props.transfer}/>
                                    </Route>
                                    <Route exact path="/TransferFromTokens">
                                        <TransferFromTokens transferFrom={this.props.transferFrom}/>
                                    </Route>
                                    <Route exact path="/GiveAlowance">
                                        <GiveAlowance approve={this.props.approve}/>
                                    </Route>
                                </Switch>
            </div>
            </Router>
        );
    }
}
class BuyTokens extends React.Component {
    render() {
        return(
            <div className="jumbotron container">
                <h1 className="display-4 text-center font-weight-bolder">Buy tokens</h1>
                <p className="lead font-weight-bolder text-center">Now you are able to buy some tokens using your REAL ethereum. <span className="text-danger">1 ETH = 1 Token </span></p>
                <hr className="my-4"/>
                <form className="form-inline row justify-content-center p-2 rounded" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.buyTokens(this.tokens.value*1000000000000000000);
                }}>
                        <input type="text" ref={(input) => this.tokens = input} className="form-control col-5" placeholder="Tokens amout" />
                        <button type="submit" className="btn btn-primary ml-3">Buy Tokens</button>
                </form>
            </div>
        );
    }
}
class TransferTokens extends React.Component {
    render() {
        return(
            <div className="jumbotron container">
                <h1 className="display-4 text-center font-weight-bolder">Transfer tokens from your account</h1>
                <p className="lead font-weight-bolder text-center">Now you are able to transfer some tokens to someone else </p>
                <hr className="my-4"/>
                <form className="form-inline row justify-content-center p-2 rounded" onSubmit={(e) => {
                    e.preventDefault();
                    let value = this.tokens.value*1000000000000000000;
                    value = value.toString();
                    this.props.transfer(this.address.value, value);
                }}>
                    <input type="text" ref={(input) => this.address = input} className="form-control col-12 col-sm-5 mr-sm-3 mb-2 mb-sm-0" placeholder="Address to" />
                    <input type="text" ref={(input) => this.tokens = input} className="form-control col-12 col-sm-3 mb-2 mb-sm-0" placeholder="Tokens amout" />
                    <button type="submit" className="btn btn-primary ml-3 ">Send tokens</button>
                </form>
            </div>
        );
    }
}
class TransferFromTokens extends React.Component {
    render() {
        return(
            <div className="jumbotron container">
                <h1 className="display-4 text-center font-weight-bolder">Transfer tokens from someone's account</h1>
                <p className="lead font-weight-bolder text-center">Now you are able to transfer some tokens from someone's else account. <span className="text-danger">You must have appropriate permission </span></p>
                <hr className="my-4"/>
                <form className="form-inline row justify-content-center p-2 rounded" onSubmit={(e) => {
                    e.preventDefault();
                    let value = this.tokens.value*1000000000000000000;
                    value = value.toString();
                    this.props.transferFrom(this.addressFrom.value,this.addressTo.value,value).then((e) => {
                        console.log(123);
                    });
                }}>
                    <input type="text" ref={(input) => this.addressFrom = input} className="form-control col-5 mr-2 mb-2" placeholder="Address from" />
                    <input type="text" ref={(input) => this.addressTo = input} className="form-control col-5 mb-2" placeholder="Address to" />
                    <input type="text" ref={(input) => this.tokens = input} className="form-control col-5" placeholder="Tokens amout" />
                    <button type="submit" className="btn btn-primary ml-2 col-5">Send tokens</button>
                </form>
            </div>
        );
    }
}
class GiveAlowance extends React.Component {
    render() {
        return(
            <div className="jumbotron container">
                <h1 className="display-4 text-center font-weight-bolder">Give permision to transfer your tokens</h1>
                <p className="lead font-weight-bolder text-center">Now you are able to give someone permision to transfer specified number of your tokens. <br/><span className="text-danger">Be careful!</span></p>
                <hr className="my-4"/>
                <form className="form-inline row justify-content-center p-2 rounded" onSubmit={(e) => {
                    e.preventDefault();
                    let value = this.tokens.value*1000000000000000000;
                    value = value.toString();
                    this.props.approve(this.address.value, value).then(r  => {
                        console.log('transation done');
                    });
                }}>
                    <input type="text" ref={(input) => this.address = input} className="form-control col-12 col-sm-5 mr-sm-3 mb-2 mb-sm-0" placeholder="Address" />
                    <input type="text" ref={(input) => this.tokens = input} className="form-control col-12 col-sm-3 mb-2 mb-sm-0" placeholder="Tokens amout" />
                    <button type="submit" className="btn btn-primary ml-3 ">Give permit</button>
                </form>
            </div>
        );
    }
}
export default YourTokens
