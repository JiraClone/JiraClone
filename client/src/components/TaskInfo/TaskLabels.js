import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';

export default function TaskLabels(currentTask) {
    const [labels, setLabels] = useState(currentTask.labels);

    const handleChange = (value) => {
        console.log(
            'this is the values being passed in labels: ',
            value[0]['value']
        );
        if (labels === undefined) {
            setLabels([value[0]['value']]);
        } else {
            setLabels([...labels, value[0]['value']]);
        }

        console.log('updated labels: ', labels);
        console.log('this is the current task', currentTask);
        axios
            .put(
                `http://localhost:8000/api/tasks/${currentTask.number}`,
                { labels: value[0]['value'] },
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
                labelField="label"
                valueField="value"
                create={true}
            />
        </div>
    );
}
