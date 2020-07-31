import React, { useState } from 'react';
import TaskHeader from './TaskHeader';
import Issues from './Issues';
import TaskInfo from './TaskInfo/TaskInfo';

export default function TaskParent({
    id,
    filteredTasks,
    setFilteredTasks,
    currentProject,
    allUsers,
}) {
    const [taskNum, setTaskNum] = useState(id);

    return (
        <div className="ml-3 col-9">
            <TaskHeader currentProject={currentProject} setFilteredTasks={setFilteredTasks}/>
            <div className="row mt-5 ml-1">
                <Issues setTaskNumber={setTaskNum} filteredTasks={filteredTasks} />

                <TaskInfo allUsers={allUsers} taskNumber={taskNum} className="col-8" />
            </div>
        </div>
    );
}
