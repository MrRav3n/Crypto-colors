import React from 'react'

class BuyColors extends React.Component {

    constructor(props){
        super(props);
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
                        price = price.toString();
                        if(item.bought===false) {
                            return (
                                <div className="col-lg-4 col-md-6 col-12 rounded color mb-3">
                                    <div key={i} className="rounded row m-1  align-items-center justify-content-center" style={styleObj} onClick={(e) => {
                                        this.props.buyColor(i)
                                    }}><h1 className="text-center">{price} STE</h1></div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default BuyColors