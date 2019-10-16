import React from 'react'
import './App.css';
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
                        <h1 className="display-4 ">Hi {this.props.account}! Time to new color: {this.props.time}</h1><h1 className="display-5"> <br />Your ballance is {this.props.balance} </h1>
                        <p className="lead font-weight-bolder">There you can safely buy,send and do anything you want with your local tokens</p>
                        <hr className="my-4" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <>
                                <Link to="/BuyColors" className="col d-inline-block bg-success text-white rounded m-1 text-center">
                                    <h1 className="mt-2">Buy Colors</h1>
                                </Link>
                                <Link to="/SellColors" className="col d-inline-block bg-primary text-white rounded m-1 text-center">
                                    <h1 className="mt-2">Sell Colors</h1>
                                </Link>
                                {this.props.mainAccount
                                ?<Link to="/AddColor" className="col d-inline-block bg-danger text-white rounded m-1 text-center">
                                        <h1 className="mt-2">Add Colors</h1>
                                    </Link>
                                    : <p />
                                }

                            </>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/BuyColors">
                            <BuyColors colors={this.props.colors}
                                       buyColor={this.props.buyColor}
                            />
                        </Route>
                        <Route exact path="/SellColors">
                            <SellColors sellColor={this.props.sellColor}/>
                        </Route>
                       <Route exact path="/AddColor">
                                <AddColor addColor={this.props.addColor}/>
                       </Route>

                    </Switch>
                </div>
            </Router>
        );
    }
}
class BuyColors extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            bought: []
        }
    }

    render() {
        return(
            <div className="jumbotron container">
                <h1 className="display-4 text-center font-weight-bolder">Buy New Colors</h1>
                <p className="lead font-weight-bolder text-center">Now you are able to buy some colors using your tokens.</p>
                <p className="lead font-weight-bolder text-center"><span className="text-danger display-3">Click to buy!</span></p>
                <hr className="my-4"/>
                <div className="row">
                {this.props.colors.map((item, i) => {
                    const styleObj = {
                        background: item.color,
                    };

                        let price = item.price / 1000000000000000000;
                        price = price.toString()
                    return (
                        <div className="col-3">
                        {item.bought
                        ? <p />
                        :<div key={i} className="rounded-circle row w-100 color  align-items-center justify-content-center" style={styleObj} onClick={(e) => {
                        this.props.buyColor(i)
                         }}><h1>{price} STE</h1></div>}
                        </div>
                    );
                })}
                </div>

            </div>
        );
    }
}
class SellColors extends React.Component {
    render() {
        return(
            <div className="jumbotron container">
                <h1 className="display-4 text-center font-weight-bolder">Sell Your Colors</h1>
                <p className="lead font-weight-bolder text-center">Now you are able to sell tokens that you own.</p>
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
class AddColor extends React.Component {
    render() {
        return(
            <div className="jumbotron container">
                <h1 className="display-4 text-center font-weight-bolder">Add New Colors</h1>
                <p className="lead font-weight-bolder text-center">Now you are able to add new tokens. </p>
                <hr className="my-4"/>
                <form className="form-inline row justify-content-center p-2 rounded" onSubmit={(e) => {
                    e.preventDefault();
                    let value = this.price.value*1000000000000000000;
                    value = value.toString()
                    this.props.addColor(this.costam.value, value);

                }}>
                    <input name="Color Picker" className="form-control col-12 col-sm-5 mr-sm-3 mb-2 mb-sm-0" ref={(input) => this.costam = input} type="color"/>
                    <input type="text" ref={(input) => this.price = input} className="form-control col-12 col-sm-3 mb-2 mb-sm-0" placeholder="Price" />
                    <button type="submit" className="btn btn-primary ml-3">Add Color</button>
                </form>
            </div>
        );
    }
}

export default YourTokens
