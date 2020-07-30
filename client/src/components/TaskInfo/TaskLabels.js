import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';

export default function TaskLabels(currentTask) {
    const [labels, setLabels] = useState(currentTask.labels);

    const handleChange = (value) => {
        console.log('this is the values being passed in labels: ', value);
        setLabels(value);
        let updatedTask = { ...currentTask };
        updatedTask.labels = [...updatedTask.labels, value];
        axios
            .put(
                `http://localhost:8000/api/tasks/${currentTask.number}`,
                updatedTask,
                { withCredentials: true }
            )
            .then((res) => res.data)
            .catch(console.log);
    };

    return (
        <div>
            <Select
                options={labels}
                onChange={(values) => handleChange(values)}
                multi={true}
                clearable={true}
                searchable={true}
                dropdownHandle={false}
                create={true}
            />
        </div>
    );
}
