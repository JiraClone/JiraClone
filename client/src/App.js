import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/Login';
import Registration from './views/Registration';
import { Router, Redirect } from '@reach/router';
import Main from './views/Main';
import NewUser from './views/NewUser';


function App() {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="App">
            <Router>
                <Redirect from="/" to="/register" noThrow />
                <Registration path="/register" />
                <Login path="/login" />
                <Main path="/home" onSubmit={onSubmit} />
                <Main path="/home/geer/:id" onSubmit={onSubmit} />
                <NewUser path="/welcome"/>
            </Router>
        </div>
    );
}

export default App;
