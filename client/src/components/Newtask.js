import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Button, Form } from 'react-bootstrap';

export default function NewTask(props) {
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
    const [projects, setProjects] = useState(null);
    const [project, setProject] = useState(null);
    const [errors, setErrors] = useState(null);
    const [socket] = useState(() => io(':8000'));

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/projects', {
                withCredentials: true,
            })
            .then((res) => setProjects(res.data))
            .catch(console.log);
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
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
            .post('http://localhost:8000/api/tasks/', newTask, {
                withCredentials: true,
            })
            .then((res) => {
                console.log('Successfully created new task! : ', res.data);
                //broadcasts new task so the issues list will auto update
                socket.emit('new task created', res.data.task);
                return res.data;
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].properties.message);
                }
                setErrors(errorArr);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* {errors.map((err, idx) => (
                <p key={idx} className="text-danger">
                    {err}
                </p>
            ))} */}
            {/* <div className="form-group">
                <label>Project</label>
                <select
                    className="form-control"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                >
                    {projects.map((p, idx) => {
                        return (
                            <option key={idx} value={p}>
                                {p.name}
                            </option>
                        );
                    })}
                </select>
            </div> */}
            {/* This is for issue Type
            <div className="form-group">
                <label>Issue Type</label>
                <select
                    className="form-control"
                    value={type}
                    onChange={(e) => setProject(e.target.value)}
                >
                    {projects.map((p, idx) => {
                        <option key={idx} value={p}>
                            {p.name}
                        </option>;
                    })}
                </select>
            </div> */}
            <Form.Group>
                <Form.Label>Summary</Form.Label>
                <Form.Control
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Attachment</Form.Label>
                <p>This is for the attachment feature</p>
            </Form.Group>
            <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    className="form-control"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reporter</Form.Label>
                <Form.Control
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Assignee</Form.Label>
                <Form.Control
                    as="select"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                >
                    <option value={null}>Unassigned</option>
                    {/* {users.map((user,idx) => {
                        <option value={user} key={idx}>{user.name}</option>
                    })} */}
                </Form.Control>
                <a>Assign to me</a>
            </Form.Group>
            <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Control
                    as="select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Labels</Form.Label>
                <Form.Control
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <div className="text-right">
                <Button
                    variant="primary"
                    type="submit"
                    onClick={props.closeModal}
                >
                    Create
                </Button>
            </div>
        </Form>
    );
}
