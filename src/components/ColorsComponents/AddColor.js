import React from 'react'

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
                    value = value.toString();
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

export default AddColor