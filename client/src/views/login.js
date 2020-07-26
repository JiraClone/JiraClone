import React, { useState, useEffect } from 'react';

const Login = (props) => {
    return ( 
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1>Geera</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-6 container shadow rounded border">
                    <div className="row my-3">
                        <div className="col font-weight-bold text-center">
                            Log in to your account
                        </div>
                    </div>
                    <div className="row">
                        <input className="col text-center m-3" type="email" placeholder="Enter email"/>
                    </div>
                    <div className="row my-3">
                        <div className="col text-center">
                            <button className="btn btn-primary">Continue</button>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col text-center">
                            <a href="">Sign up for an account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Login;