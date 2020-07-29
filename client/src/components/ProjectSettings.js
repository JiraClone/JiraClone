import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { navigate, Link } from '@reach/router';

const ProjectSettings = (props) => {

    const projectID = "5f2095232eb7bf4afc8fd3bd";

    const {setCurrentView} = props;
    const [projectName, setProjectName] = useState("");
    const [projectUsers, setProjectUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:8000/api/users')
            .then(res => {
                console.log(res.data);
                setAllUsers(res.data);
            })
        Axios.get('http://localhost:8000/api/projects/'+projectID)
        .then(res =>{
            console.log(res.data);
            setProjectName(res.data.name);
            setProjectUsers(res.data.users);
        })
    }, [])

    //Handle update of project
    function handleSubmit(e){
        e.preventDefault();
        const projectUpdates = {
            name: projectName,
            users: projectUsers.map(user => user._id)
        }
        Axios.put('http://localhost:8000/api/projects/'+projectID, projectUpdates, {withCredentials: true})
            .then(res =>{
                console.log(res);
                setCurrentView("tasks");
            })
            .catch(err =>{
                console.log(err);
            })
    }

    //Handle adding a user to the project
    //Only adds locally does not push to server until hitting save
    function addUser(e){
        e.preventDefault();
        const user = document.getElementById('userToAdd');
        console.log(user.value);
        setProjectUsers([...projectUsers, allUsers[user.value]]);
    }

    //Handle removing a user from the project
    //Only removes locally does not update server until hitting save
    function removeUser(userID){
        console.log("userID: ", userID);
        setProjectUsers(projectUsers.filter(user => user._id != userID));
    }

    return ( 
        <div className="container">
            <form onSubmit={handleSubmit} >
                <div className="row my-4 text-left">
                    <h1>Project Settings</h1>
                </div>
                <div className="row my-2">
                    <div className="col-2">
                        <label>Name: </label>
                    </div>
                    <input className="col-3" type="text" value={projectName} onChange={ e => setProjectName(e.target.value)} />
                </div>
                <div className="row my-2">
                    <div className="col-2">
                        <label>Add User: </label>
                    </div>
                    <select id="userToAdd" className="col-3" >
                        {
                            allUsers.map((user, index) => 
                                <option key={index} value={index}>{user.name}</option>
                            )
                        }
                        
                    </select>
                    <div className="col-2">
                        <button onClick={addUser} className="btn btn-primary">Add User</button>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-2">
                        <label>Users : </label>
                    </div>
                    <div className="col-7">
                        {
                            projectUsers.map((user, index) => 
                                <div onClick={() => removeUser(user._id)} value={user._id} key={index} className="mr-2 btn btn-secondary">{user.name} X</div>
                            )
                        }
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-5">
                        <div className="row">
                            <div className="col-6 text-right">
                                <div onClick={() => setCurrentView("tasks")} className="btn btn-secondary">Cancel</div>
                            </div>
                            <div className="col-6">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default ProjectSettings;