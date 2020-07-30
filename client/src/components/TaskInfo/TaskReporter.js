import React, { useState } from 'react';
import axios from 'axios';
// import { FormControl } from 'react-bootstrap';
import Select from 'react-dropdown-select';

export default function TaskReporter({
    currentTask,
    allUsers,
    // errors,
    // setErrors,
}) {
    const [reporter, setReporter] = useState(currentTask.creator);
    const handleChange = (value) => {
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
            {/* <FormControl
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
            </FormControl> */}
            <Select
                options={allUsers}
                onChange={(values) => handleChange(values)}
                multi={false}
                clearable={true}
                searchable={true}
                dropdownHandle={false}
            />
        </div>
    );
}
