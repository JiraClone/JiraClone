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
        setAssignee(value[0]);

        console.log('this is current task: ', currentTask);
        console.log('this is all the users: ', allUsers);

        console.log('this is the currentTask.assignee: ', currentTask.assignee);

        axios
            .put(
                `http://localhost:8000/api/tasks/${currentTask.number}`,
                { assignee: value[0] },
                { withCredentials: true }
            )
            .then((res) => res.data)
            .catch(console.log);
        // (err) => setErrors([...errors, err.response.data.message]));
    };

    if (assignee === undefined) return 'Loading...';
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
                labelField="name"
                values={[
                    allUsers.find((user) => user._id === currentTask.assignee),
                ]}
                // placeholder={assignee.name}
            />
        </div>
    );
}
