import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskContent from '../components/TaskContent';
import NewTask from '../components/NewTask';
import Issues from '../components/Issues';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

export default function Main() {
    const [taskNum, setTaskNum] = useState(0);
    // function reducer(state, action) {
    //     switch (action.type) {
    //         case 'TASK_NUMBER':
    //             return {
    //                 ...state,
    //                 task: action.task,
    //             };
    //         default:
    //             return state;
    //     }
    // }

    // const initialState = {
    //     task: {
    //         number: 0,
    //     },
    // };
    // const store = createStore(reducer, initialState);

    return (
        <div>
            {/* <Provider store={store}> */}
            <Header />
            <Sidebar />
            <Issues setTaskNumber={setTaskNum} />
            {/* <NewTask /> */}
            <TaskContent taskNumber={taskNum} />
            {/* </Provider> */}
        </div>
    );
}
