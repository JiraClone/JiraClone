import React, { useState } from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';

export default function TaskAssignee({ assignee, setAssignee }) {
    const [user, setUser] = useState(assignee);
    const handleChange = (value) => {
        setUser(value);
        setAssignee(value);
        let updatedTask = axios.put();
    };

    return (
        <div>
            <FormControl
                as="select"
                value={user}
                onChange={(e) => handleChange(e.target.value)}
            >
                {assignee.map((g, idx) => {
                    return (
                        <option key={idx} value={g}>
                            {g.name}
                        </option>
                    );
                })}
            </FormControl>
        </div>
    );
}
