import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './task.module.css';


export default function TaskDesc({task}) {
    const [description, setDescription] = useState(task.description);
    const [newDescription, setNewDescription] = useState(task.description);
    const id = task._id;

    const saveDesc = () => {
        axios.put(`http://localhost:8000/api/tasks/${id}`, 
                { description: newDescription }, 
                { withCredentials: true }
                )
            .then(res => {
                console.log('successfully updated desc', res)
                setDescription(newDescription);
            })
            .catch(console.log);
    }

    return(
        <div>
            <h5>Description</h5>
            <textarea cols="36" 
                    rows="4" 
                    value={newDescription} 
                    onChange={e => setNewDescription(e.target.value)} 
                    placeholder="Add a description..."
                    className={styles.textInput}
            />
            <button type="button"
                    className={styles.saveButton}
                    onClick={ saveDesc }>
                        Save
            </button>
            <button type="button"
                    className={styles.cancelButton}
                    onClick={() => setNewDescription(description)}>
                        Cancel
            </button>
        </div>
    )
}