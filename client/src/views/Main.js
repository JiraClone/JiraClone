import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
// import TaskContent from '../components/TaskContent';
// import NewTask from '../components/NewTask';
// import Issues from '../components/Issues';
import TaskParent from '../components/TaskParent';

export default function Main(props) {
    return (
        <div>
            <Header />

            <div className="row">
                <Sidebar />
                <TaskParent id={props.id} />
            </div>
        </div>
    );
}
