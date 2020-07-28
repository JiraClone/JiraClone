import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './taskContent.module.css';
// import { useDispatch, useSelector } from 'react-redux';

export default function TaskContent(props) {
    // const dispatch = useDispatch();
    // const rTask = useSelector((state) => state.task);

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
            .get('http://localhost:8000/api/tasks/' + props.taskNumber, {
                withCredentials: true,
            })
            .then((res) => {
                // Destructuring did not work here
                console.log(res.data);
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
            .get('http://localhost:8000/api/users', {
                withCredentials: true,
            })
            .then((res) => setUsers(res.data))
            .catch(console.log);
    }, [props.taskNumber]);

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
            .put(
                `http://localhost:8000/api/tasks/${props.taskNumber}`,
                updatedTask,
                {
                    withCredentials: true,
                }
            )
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

    if (task == null || users == null) {
        return <p>The task you have selected does not exist!</p>;
    }

    return (
        <div className={styles.content}>
            <form onSubmit={handleSubmit}>
                <div className={styles.content}>
                    {errors.map((err, idx) => (
                        <p key={idx}>{err}</p>
                    ))}
                    {/* Likely will need to incorporate 'projectname-autoincrementingID' here*/}
                    <h3>
                        <input
                            value={task.name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </h3>
                    <div>
                        <button>Attach</button>
                        <button>Create subtask</button>
                        <button>Link issue</button>
                    </div>
                    <p>
                        <strong>Description</strong>
                    </p>
                    <textarea
                        rows="4"
                        aria-label="Add a description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <p>
                        <strong>Activity</strong>
                    </p>
                    <div>
                        Show:
                        <button>Comments</button>
                        <button>History</button>
                        <button>Work log</button>
                        <textarea
                            rows="1"
                            aria-label="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </div>
                <div className={styles.content}>
                    <select value={type} onChange={(e) => e.target.value}>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <div>
                        <label>Assignee</label>
                        <select
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
                    <div>
                        <label>Reporter</label>
                        <select
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
                    <div>
                        <label>Due date</label>
                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => e.target.value}
                        />
                    </div>
                    <div>
                        <label>Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => e.target.value}
                        >
                            <option value="High">High</option>
                            <option defaultValue value="Medium">
                                Medium
                            </option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label>Labels</label>
                        <input
                            type="text"
                            value={labels}
                            onChange={(e) => handleLabels(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Original Estimate</label>
                        <input
                            type="number"
                            value={estimate}
                            onChange={(e) => setEstimate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Time tracking</label>
                        <input
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

// function mapStateToProps(state) {
//     return {
//         user: state.user,
//     };
// }

// export default connect(mapStateToProps)(TaskContent);
