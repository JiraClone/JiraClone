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
        <div className="">
            <TaskHeader currentProject={currentProject} />
            <div className="row mt-3">
                <Issues
                    setTaskNumber={setTaskNum}
                    filteredTasks={filteredTasks}
                />
                <div className="col-8">
                    <TaskInfo
                        allUsers={allUsers}
                        taskNumber={taskNum}
                    />
                </div>
            </div>
        </div>
    );
}
