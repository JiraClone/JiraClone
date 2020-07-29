import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskTitle from './TaskTitle';
import TaskActivity from './TaskActivity';
import TaskAssignee from './TaskAssignee';

export default function TaskInfo({ taskNumber }) {
    const [loaded, setLoaded] = useState(false);
    // const [task, setTask] = useState(null)
    const [name, setName] = useState(null);
    const [number, setNumber] = useState(null);
    const [description, setDescription] = useState('');
    const [type, setType] = useState('To Do');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [assignee, setAssignee] = useState(null);
    const [creator, setCreator] = useState(null);
    const [estimate, setEstimate] = useState(0);
    const [timeTracked, setTimeTracked] = useState(0);
    const [labels, setLabels] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/tasks/${taskNumber}`, {
                withCredentials: true,
            })
            .then((res) => {
                // setTask(res.data);
                setName(res.data.name);
                setNumber(res.data.number);
                setDescription(res.data.description);
                // setComments(res.data.comments);
                setType(res.data.type);
                setDueDate(res.data.dueDate);
                setPriority(res.data.priority);
                setAssignee(res.data.assignee);
                setCreator(res.data.creator);
                setEstimate(res.data.estimate);
                setTimeTracked(res.data.timeTracked);
                setLabels(res.data.labels);
                setStatus(res.data.status);
                setLoaded(true);
            })
            .catch(console.log);
    });

    if (!loaded) return 'Loading...';

    // if(loaded) {
    //     var { name, number } = task;
    // }

    return (
        <div className="row">
            <div className="col-9">
                <p>GEER-{number}</p>
                <TaskTitle name={name} setName={setName} number={number} />
                <div>
                    <span>Attach </span>
                    <span>Create Subtask </span>
                    <span>Link Issue </span>
                    <span>LWaM</span>
                </div>
                <div>
                    <p>Description</p>
                    <input type="text" />
                </div>
                <TaskActivity />
            </div>
            <div className="col-3">
                <p>todo</p>
                <TaskAssignee assignee={assignee} setAssignee={setAssignee} />
                <p>reporter</p>
                <p>due date</p>
                <p>priority</p>
                <p>show 3 more fields</p>
            </div>
        </div>
    );
}
