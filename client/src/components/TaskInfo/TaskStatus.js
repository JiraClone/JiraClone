import React, { useState } from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';

export default function TaskStatus(currentTask) {
    const [status, setStatus] = useState(currentTask.status);

    const handleChange = (value) => {
        console.log('this is the value in status: ', value);
        setStatus(value);
        let updatedTask = { ...currentTask };
        updatedTask.currentTask.status = value;
        console.log(
            '***** and this is the updatedTask: ',
            updatedTask.currentTask
        );
        axios
            .put(
                `http://localhost:8000/api/tasks/${currentTask.number}`,
                updatedTask.currentTask,
                { withCredentials: true }
            )
            .then((res) => res.data)
            .catch(console.log);
    };

    return (
        <div>
            <FormControl
                as="select"
                value={status}
                onChange={(e) => handleChange(e.target.value)}
            >
                <option defaultValue value="Todo">
                    To Do
                </option>
                <option value="Done">Done</option>
            </FormControl>
        </div>
    );
}
