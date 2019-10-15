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
                    <h1 className="display-4 ">Hi {this.props.account}!</h1><h1 className="display-5"> <br />Your ballance: {this.props.balance} </h1>
                    <p className="lead font-weight-bolder">There you can safely buy,send and do anything you want with your local tokens</p>
                    <hr className="my-4" />
                </div>
                    <div className="container">
                        <div className="row">
                            <>
                            <Link to="/BuyTokens" className="col d-inline-block bg-success text-white rounded m-1 text-center">
                                <h1>Buy Tokens</h1>
                            </Link>
                            <Link to="/TransferTokens" className="col d-inline-block bg-primary text-white rounded m-1 text-center">
                                <h1>Transfer Tokens</h1>
                            </Link>
                            <Link to="/TransferFromTokens" className="col d-inline-block bg-danger text-white rounded m-1 text-center">
                                <h1>Transfer From</h1>
                            </Link>
                            <Link to="/GiveAlowance" className="col d-inline-block bg-warning text-white rounded m-1 text-center" >
                                <h1>Give Permit</h1>
                            </Link>
                            </>
                        </div>
                    </div>
                                <Switch>
                                    <Route exact path="/BuyTokens">
                                        <BuyTokens buyTokens={this.props.buyTokens}/>
                                    </Route>
                                    <Route exact path="/TransferTokens">
                                        <TransferTokens />
                                    </Route>
                                    <Route exact path="/TransferFromTokens">
                                        <TransferFromTokens />
                                    </Route>
                                    <Route exact path="/GiveAlowance">
                                        <GiveAlowance />
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
                <p className="lead font-weight-bolder text-center">Now you are able to buy some tokens using your REAL ethereum. <span className="text-danger">1 ETH = 1 Token (minimum 0.000001 ETH)</span></p>
                <hr className="my-4"/>
                <form className="form-inline row justify-content-center" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.buyTokens(this.tokens.value*1000000000000000000);
                }}>
                        <input type="text" ref={(input) => this.tokens = input} className="form-control col-5" placeholder="Tokens number" />
                        <button type="submit" className="btn btn-primary ml-3">Buy Tokens</button>
                </form>
            </div>
        );
    }
}
class TransferTokens extends React.Component {
    render() {
        return(
            <h1>1123123123213</h1>
        );
    }
}
class TransferFromTokens extends React.Component {
    render() {
        return(
            <h1>1123123</h1>
        );
    }
}
class GiveAlowance extends React.Component {
    render() {
        return(
            <h1>1123123</h1>
        );
    }
}
export default YourTokens
