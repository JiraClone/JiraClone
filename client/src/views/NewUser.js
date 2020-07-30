import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

export default function NewUser() {
    const [name, setName] = useState('');
    const user = localStorage.getItem('userName');

    const createProject = () =>{
        console.log(name);

        axios.post(
            'http://localhost:8000/api/projects',
            { name, users: [localStorage.getItem('userID')] },
            { withCredentials: true }
        )
            .then(() => {
                return navigate('/home');
            })
            .catch((err) => console.log(err));
    }

    return (
        <div style={{textAlign:"center", margin:"48px"}}>
            <h1>Welcome to Geera {user}!</h1>
            <p>Get started by creating your first project!</p>
            <input type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="enter a project name..."
                style={{display:"block", margin:"12px auto", padding:"4px" }}/>
            <button type="button"
                    onClick={ createProject }
                    className="btn btn-primary">
                        Create Project!
            </button>
        </div>
    )
}