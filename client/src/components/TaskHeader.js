import React, { useState } from 'react';

export default function TaskHeader() {
    return (
        <div className="mt-3">
            <p className="text-secondary">Project / GeeraClone</p>
            <h4>All issues</h4>
            <input type="text" /> <a href="#">Advanced search</a>
        </div>
    );
}
