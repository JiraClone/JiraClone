import React, { useState } from 'react';

export default function TaskHeader(props) {
    if (props.currentProject == null) {
        return <p>Loading...</p>;
    }
    return (
        <div className="mt-3">
            <p className="text-secondary">
                Project / {props.currentProject.name}
            </p>
            <h4>All issues</h4>
            <input type="text" /> <a href="#">Advanced search</a>
        </div>
    );
}
