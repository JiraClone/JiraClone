import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskContent from '../components/TaskContent';
import NewTask from '../components/NewTask';
import Issues from '../components/Issues';

export default function Main(props) {
    const [taskNum, setTaskNum] = useState(props.id);

    return (
        <div>
            <Header />
            <Sidebar />
            <Issues setTaskNumber={setTaskNum} />
            {/* <NewTask /> */}
            <TaskContent taskNumber={taskNum} />
        </div>
    );
}
