import React, { useState } from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';

export default function TaskDueDate({ currentTask }) {
    const [dueDate, setDueDate] = useState(currentTask.dueDate);

    const handleChange = (value) => {
        setDueDate(value);

        axios
            .put(
                `http://localhost:8000/api/tasks/${currentTask.number}`,
                { dueDate: value },
                { withCredentials: true }
            )
            .then((res) => res.data)
            .catch(console.log);
    };

    return (
        <div>
            <FormControl
                type="date"
                value={dueDate}
                onChange={(e) => handleChange(e.target.value)}
            ></FormControl>
        </div>
    );
}
