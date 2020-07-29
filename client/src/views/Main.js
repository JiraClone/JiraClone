import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
// import TaskContent from '../components/TaskContent';
// import NewTask from '../components/NewTask';
// import Issues from '../components/Issues';
import TaskParent from '../components/TaskParent';

export default function Main(props) {
    return (
        <>
        <div className="row">
            <div className="col-12">
                <Header></Header>
            </div>
        </div>
        <div className="row">
            <div className="col-2">
                <Sidebar />
            </div>
            <div className="col-9">
                <TaskParent id={props.id} />
            </div>
        </div>
        </>
    );
}
