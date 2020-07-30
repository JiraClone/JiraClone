import React, { useState } from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';

export default function TaskReporter({
    reporter,
    setReporter,
    currentTask,
    allUsers,
    // errors,
    // setErrors,
}) {
    // const [user, setUser] = useState(reporter);
    const handleChange = (value) => {
        // setUser(value);
        setReporter(value);
        let updatedTask = { ...currentTask };
        updatedTask.creator = value;
        axios
            .put(
                `http://localhost:8000/api/tasks/${currentTask.number}`,
                updatedTask,
                { withCredentials: true }
            )
            .then((res) => res.data)
            .catch(console.log);
        // (err) => setErrors([...errors, err.response.data.message]));
    };

    if (reporter === undefined) return 'Loading...';
    return (
        <div>
            <FormControl
                as="select"
                value={reporter}
                onChange={(e) => handleChange(e.target.value)}
            >
                {allUsers.map((user, idx) => {
                    return (
                        <option key={idx} value={user}>
                            {user.name}
                        </option>
                    );
                })}
            </FormControl>
        </div>
    );
}
