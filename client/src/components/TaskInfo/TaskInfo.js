import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskTitle from './TaskTitle';
import TaskActivity from './TaskActivity';
import TaskAssignee from './TaskAssignee';
import TaskDesc from './TaskDesc';
import TaskDueDate from './TaskDueDate';
import TaskLabels from './TaskLabels';
import TaskPriority from './TaskPriority';
import TaskReporter from './TaskReporter';
import TaskStatus from './TaskStatus';

import styles from './task.module.css';

export default function TaskInfo({ allUsers, taskNumber }) {
    const [loaded, setLoaded] = useState(false);
    const [task, setTask] = useState(null);

    useEffect(() => {
        setLoaded(false);
        axios
            .get(`http://localhost:8000/api/tasks/${taskNumber}`, {
                withCredentials: true,
            })
            .then((res) => {
                setTask(res.data);
                setLoaded(true);
            })
            .catch(console.log);
    }, [taskNumber]);

    if (!loaded) return 'Loading...';

    return (
        <div className={`row ${styles.taskInfo} `}>
            <div className="col-9">
                <p>GEER-{task.number}</p>
                <TaskTitle task={task} />
                <div>
                    <span>Attach </span>
                    <span>Create Subtask </span>
                    <span>Link Issue </span>
                    <span>LWaM</span>
                </div>
                <TaskDesc task={task} />
                <TaskActivity task={task} />
            </div>
            <div className="col-3">
                <TaskStatus currentTask={task} />
                <TaskAssignee allUsers={allUsers} currentTask={task} />
                <TaskReporter allUsers={allUsers} currentTask={task} />
                <TaskPriority currentTask={task} />
            </div>
        </div>
    );
}
