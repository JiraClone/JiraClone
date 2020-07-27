import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskContent from '../components/TaskContent';
import NewTask from '../components/Newtask';

export default function Main(){
    return(
        <div>
            <Header/>
            <Sidebar/>
            <NewTask />
            <TaskContent/>
        </div>
    )
}