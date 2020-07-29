import React, { useState } from 'react';
import axios from 'axios';

export default function TaskTitle({name, setName, number}){
    // const [name, setName] = useState(title);
    const [newName, setNewName] = useState(name);
    const [selected, setSelected] = useState(false);

    
    const changeName = () => {
        axios.put(`http://localhost:8000/api/tasks/${number}`, {name: newName}, {withCredentials: true,})
            .then(res => {
                setName(res.data.name)
                setSelected(false)
            })
            .catch(console.log)
    }

    const cancelChanges = () => {
        setNewName(name);
        setSelected(false);
    }

    return(
        <div>
            <h1 onClick={() => setSelected(!selected)}>{name}</h1>
            <div style={selected ? {visibility: "visible"} : {visibility:"hidden"}}>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
                <button type="button" onClick={ changeName }>Change Name</button>
                <button type="button" onClick={ cancelChanges }>Cancel</button>
            </div>
        </div>
    )
}