import React from 'react'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import BuyColors from "./ColorsComponents/BuyColors";
import SellColors from "./ColorsComponents/SellColors";
import AddColor from "./ColorsComponents/AddColor";
//Colors part of the website
class YourTokens extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="jumbotron container mb-0">
                        <h1 className="display-4 ">Hi {this.props.account}! Time to new color: <span className="text-danger">{this.props.time}</span></h1><h1 className="display-5"> <br />Your ballance is {this.props.balance} STE</h1>
                        <p className="lead font-weight-bolder">There you can safely buy, send and do anything you want with your local tokens</p>
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
                            <SellColors sellColor={this.props.sellColor}
                                        personColors={this.props.personColors}
                                        peopleItemsCount={this.props.peopleItemsCount}
                                        person={this.props.person}
                                        colors={this.props.colors}
                                        accountLong={this.props.accountLong}
                            />
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




export default YourTokens
