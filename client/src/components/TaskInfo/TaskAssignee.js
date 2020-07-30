import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';

export default function TaskAssignee({
    currentTask,
    allUsers,
    // errors,
    // setErrors,
}) {
    const [assignee, setAssignee] = useState(currentTask.assignee);
    const handleChange = (value) => {
        setAssignee(value);
        let updatedTask = { ...currentTask };
        updatedTask.assignee = value;
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

    if (assignee === undefined || allUsers === undefined) return 'Loading...';
    return (
        <div>
            {/* <FormControl
                as="select"
                value={assignee}
                onChange={(e) => handleChange(e.target.value)}
            >
                {allUsers.map((user, idx) => {
                    return (
                        <option key={idx} value={user}>
                            {user.name}
                        </option>
                    );
                })}
            </FormControl> */}
            <Select
                options={allUsers}
                onChange={(values) => handleChange(values)}
                multi={false}
                clearable={true}
                searchable={true}
                dropdownHandle={false}
                searchBy="name"
            />
        </div>
    );
}
