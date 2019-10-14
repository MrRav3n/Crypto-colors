import './App.css'

import React from 'react'
    //Navbar with account address
    function Navbar({account}) {
            return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand text-center" href="index.html"><h2>Crypto-Colors</h2></a>
                        <span className="text-white ml-auto ">
                            <h4 className="text-white d-none d-lg-block">Your account: {account} </h4>
                        </span>
                    </div>
                </nav>
            );
    }

export default Navbar
