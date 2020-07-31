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

    const [name, setName] = useState(null);
    const [number, setNumber] = useState(null);
    // const [description, setDescription] = useState('');
    // const [type, setType] = useState('To Do');
    // const [dueDate, setDueDate] = useState('');
    // const [priority, setPriority] = useState('');
    // const [assignee, setAssignee] = useState(null);
    // const [creator, setCreator] = useState(null);
    // const [estimate, setEstimate] = useState(0);
    // const [timeTracked, setTimeTracked] = useState(0);
    // const [labels, setLabels] = useState([]);
    // const [status, setStatus] = useState('');
    const [comments, setComments] = useState(null);

    useEffect(() => {
        setLoaded(false);
        axios
            .get(`http://localhost:8000/api/tasks/${taskNumber}`, {
                withCredentials: true,
            })
            .then((res) => {
                setTask(res.data);
                setName(res.data.name);
                setNumber(res.data.number);
                // setDescription(res.data.description);
                setComments(res.data.comments);
                // setType(res.data.type);
                // setDueDate(res.data.dueDate);
                // setPriority(res.data.priority);
                // setAssignee(res.data.assignee);
                // setCreator(res.data.creator);
                // setEstimate(res.data.estimate);
                // setTimeTracked(res.data.timeTracked);
                // setLabels(res.data.labels);
                // setStatus(res.data.status);

                setLoaded(true);
            })
            .catch(console.log);
    }, [taskNumber]);

    if (!loaded) return 'Loading...';

    return (
        <div className={`row ${styles.taskInfo} `}>
            <div className="col-9">
                <p>GEER-{number}</p>
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
                <p>Assignee</p>
                <TaskAssignee allUsers={allUsers} currentTask={task} />
                <p>Reporter</p>
                <TaskReporter allUsers={allUsers} currentTask={task} />
                <p>Due Date</p>
                <TaskDueDate currentTask={task} />
                <p>Priority</p>
                <TaskPriority currentTask={task} />
                <p>Labels</p>
                <TaskLabels currentTask={task} />
                {/* <p>Original Estimate</p> */}
                {/* <p>show 3 more fields</p> */}
            </div>
        </div>
    );
}
