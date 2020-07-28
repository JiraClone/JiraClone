import React from 'react';
import './App.css';
import Login from './views/Login';
import Registration from './views/Registration';
import {Router, Redirect} from '@reach/router';
import Main from './views/Main';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Router>
        <Redirect from="/" to="/register" noThrow />
        <Registration path="/register"/>
        <Login path="/login"/>
        <Main path="/home"/>
        <Header path="/header"/>
      </Router>
    </div>
  );

}

export default App;
