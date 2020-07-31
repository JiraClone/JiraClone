import React, { useState } from 'react';
import TaskHeader from './TaskHeader';
import Issues from './Issues';
import TaskInfo from './TaskInfo/TaskInfo';

export default function TaskParent({
    id,
    filteredTasks,
    currentProject,
    allUsers,
}) {
    const [taskNum, setTaskNum] = useState(id);

    return (
        <div className="">
            <TaskHeader currentProject={currentProject} />
            <div className="row mt-5">
                <Issues
                    setTaskNumber={setTaskNum}
                    filteredTasks={filteredTasks}
                />
                <div className="col-8">
                    <TaskInfo
                        allUsers={allUsers}
                        taskNumber={taskNum}
                        className="col-8"
                    />
                </div>
            </div>
        </div>
    );
}
