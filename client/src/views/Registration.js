import React, { useState, useEffect } from 'react';

const Registration = (props) => {
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
                            Sign up for your account
                        </div>
                    </div>
                    <div className="row">
                        <input className="col text-center m-3" type="email" placeholder="Enter email address"/>
                    </div>
                    <div className="row">
                        <input className="col text-center m-3" type="text" placeholder="Enter full name"/>
                    </div>
                    <div className="row">
                        <input className="col text-center m-3" type="password" placeholder="Create password"/>
                    </div>
                    <div className="row my-3">
                        <div className="col text-center">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col text-center">
                            <a href="">Already have an account? Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Registration;