import React, { useState } from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';

export default function TaskPriority({ currentTask }) {
    const [priority, setPriority] = useState(currentTask.priority);

    const handleChange = (value) => {
        axios.put(`http://localhost:8000/api/tasks/${currentTask._id}`,
                { priority: value },
                { withCredentials: true }
            )
            .then(() => setPriority(value))
            .catch(console.log);
    };

    return (
        <div>
            <h5>Priority</h5>
            <FormControl
                as="select"
                value={priority}
                onChange={(e) => handleChange(e.target.value)}
            >
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
            </FormControl>
        </div>
    );
}
