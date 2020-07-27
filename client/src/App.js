import React from 'react';
import './App.css';
import Login from './views/Login';
import Registration from './views/Registration';
import {Router, Redirect} from '@reach/router';
import Main from './views/Main';


function App() {
  return (
    <div className="App">
      <Router>
        <Redirect from="/" to="/register" noThrow />
        <Registration path="/register"/>
        <Login path="/login"/>
        <Main path="/home"/>
      </Router>
    </div>
  );

}

export default App;
