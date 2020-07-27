import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TaskContent(props) {
    const [task, setTask] = useState(null);
    const [users, setUsers] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [comments, setComments] = useState({});
    //maybe won't have to initialize it to 'To Do'
    const [type, setType] = useState('To Do');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [assignee, setAssignee] = useState(null);
    const [creator, setCreator] = useState(null);
    const [estimate, setEstimate] = useState(0);
    const [timeTracked, setTimeTracked] = useState(0);
    const [labels, setLabels] = useState([]);
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/tasks' + props.id)
            .then((res) => {
                // Destructuring did not work here
                setTask(res.data);
                setName(res.data.name);
                setDescription(res.data.description);
                setComments(res.data.comments);
                setType(res.data.type);
                setDueDate(res.data.dueDate);
                setPriority(res.data.priority);
                setAssignee(res.data.assignee);
                setCreator(res.data.creator);
                setEstimate(res.data.estimate);
                setTimeTracked(res.data.timeTracked);
                setLabels(res.data.labels);
                setStatus(res.data.status);
            })
            .catch(console.log);

        axios
            .get('http://localhost:8000/api/users')
            .then((res) => setUsers(res.data))
            .catch(console.log);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTask = {
            name,
            description,
            comments,
            type,
            dueDate,
            priority,
            assignee,
            creator,
            estimate,
            timeTracked,
            labels,
            status,
        };

        axios
            .put(`http://localhost:8000/api/tasks/${props.id}`, updatedTask)
            .then((res) => setTask(res.data))
            .catch((err) => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].properties.message);
                }
                setErrors(errorArr);
            });
    };

    const handleLabels = (value) => {
        setLabels(...labels, value);
    };

    const handleComments = (value) => {
        setComments(...comments, value);
    };

    if (task == null) {
        return <p>The task you have selected does not exist!</p>;
    }

    return (
        <div className="row task-content">
            <form className="form">
                <div className="col-9">
                    {errors.map((err, idx) => (
                        <p key={idx} className="text-danger">
                            {err}
                        </p>
                    ))}
                    {/* Likely will need to incorporate 'projectname-autoincrementingID' here*/}
                    <h3>
                        <input
                            className="form-control"
                            value={task.name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </h3>
                    <div>
                        <button className="btn btn-light">Attach</button>
                        <button className="btn btn-light">
                            Create subtask
                        </button>
                        <button className="btn btn-light">Link issue</button>
                    </div>
                    <p>
                        <strong>Description</strong>
                    </p>
                    <textarea
                        rows="4"
                        className="form-control"
                        aria-label="Add a description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <p>
                        <strong>Activity</strong>
                    </p>
                    <div>
                        Show:
                        <button className="btn btn-light">Comments</button>
                        <button className="btn btn-light">History</button>
                        <button className="btn btn-light">Work log</button>
                        <textarea
                            rows="1"
                            className="form-control"
                            aria-label="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="text-left">
                        <button type="submit">Submit</button>
                    </div>
                </div>
                <div className="col-3">
                    <select
                        className="form-control"
                        value={type}
                        onChange={(e) => e.target.value}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <div className="form-group">
                        <label>Assignee</label>
                        <select
                            className="form-control"
                            value={assignee}
                            onChange={(e) => e.target.value}
                        >
                            {users.map((user, idx) => (
                                <option key={idx} value={user}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Reporter</label>
                        <select
                            className="form-control"
                            value={creator}
                            onChange={(e) => e.target.value}
                        >
                            {users.map((user, idx) => (
                                <option key={idx} value={user}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Due date</label>
                        <input
                            className="form-control"
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => e.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Priority</label>
                        <select
                            className="form-control"
                            value={priority}
                            onChange={(e) => e.target.value}
                        >
                            <option value="High">High</option>
                            <option selected value="Medium">
                                Medium
                            </option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Labels</label>
                        <input
                            className="form-control"
                            type="text"
                            value={labels}
                            onChange={(e) => handleLabels(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Original Estimate</label>
                        <input
                            className="form-control"
                            type="number"
                            value={estimate}
                            onChange={(e) => setEstimate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Time tracking</label>
                        <input
                            className="form-control"
                            type="number"
                            value={timeTracked}
                            onChange={(e) => setTimeTracked(e.target.value)}
                        />
                    </div>
                    {/* Implement timestamp properties */}
                </div>
            </form>
        </div>
    );
}
