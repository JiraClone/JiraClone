import React from 'react';
import './App.css';
import Header from './components/Header';
import TaskContent from './components/TaskContent';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <TaskContent />
    </div>
  );

}

export default App;
