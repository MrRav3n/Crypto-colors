import React from 'react'

class SellColors extends React.Component {
    render() {
        return(
            <div className="jumbotron container">
                <h1 className="display-4 text-center font-weight-bolder">Sell Your Colors</h1>
                <p className="lead font-weight-bolder text-center">Now you are able to sell colors that you own.</p>
                <p className="lead font-weight-bolder text-center"><span className="text-danger display-3">Type below the price and then click on item you want to sell.</span></p>
                <hr className="my-4"/>
                <div className="form-inline row justify-content-center p-2 rounded">
                    <input type="text" ref={(input) => this.price = input} className="form-control col-12 col-sm-5 mr-sm-3 mb-2 mb-sm-0" placeholder="Price" />
                </div>
                <div className="row mt-3">
                    {this.props.personColors.map((item, i) => {

                        if(this.props.person[i] != 999) {
                       if(this.props.colors[this.props.person[i]].owner===this.props.accountLong && item.bought === true ) {
                           const styleObj = {
                               background: item.color,
                           };
                           let price = item.price / 1000000000000000000;

                           price = price.toString()

                           let person = this.props.person[i].toString()

                           return (
                               <div key={i} className="col-lg-4 col-md-6 col-12 rounded color mb-3">

                                   <div className="rounded row m-1 color  align-items-stretch justify-content-center" style={styleObj} onClick={(e) => {

                                       let priceToSell = this.price.value*1000000000000000000;
                                       priceToSell = priceToSell.toString()
                                       this.props.sellColor(i, priceToSell)
                                   }}><h1 className="text-center">{price} STE</h1></div>
                               </div>
                           );
                       }
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default SellColors