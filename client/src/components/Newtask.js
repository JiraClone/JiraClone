import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NewTask() {
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

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/projects')
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
            .post('http://localhost:8000/api/tasks', newTask)
            .then((res) => res.data)
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
        <form className="form" onSubmit={handleSubmit}>
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
            <div className="form-group">
                <label>Summary</label>
                <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Attachment</label>
                <p>This is for the attachment feature</p>
            </div>
            <div className="form-group">
                <label>Due Date</label>
                <input
                    className="form-control"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    className="form-control"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="text-right">
                <button type="submit">Create</button>
            </div>
        </form>
    );
}
