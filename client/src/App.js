import React from 'react';
import './App.css';
import Login from './views/Login';
import Registration from './views/Registration';
import {Router} from '@reach/router';


function App() {
  return (
    <div className="App">
      <Router>
        <Registration path="/register"/>
        <Login path="/login"/>
      </Router>
    </div>
  );

}

export default App;
