import React, { useState, useEffect } from 'react';
import styles from './sidebar.module.css';
import Axios from 'axios';
import { navigate } from '@reach/router';

export default function Sidebar(props) {
    
    const {tasks, setFilteredTasks, setCurrentView, currentProj, allProjects, setAllProjects, setCurrentProj} = props;
    
    const [selected, setSelected] = useState(3);

    //Handle selection
    function handleClick(e){
        setSelected(e.target.id);
        setCurrentView("tasks");
        switch(e.target.id){
            case '1':
                console.log("My Open Issues", tasks);
                let temp = tasks.filter(task => task.assignee === localStorage.getItem("userID") && task.status === "0" );
                setFilteredTasks(temp);
                console.log(temp);
                break;
            case '2':
                console.log("Reported By Me");
                let temp1 = tasks.filter(task => task.creator === localStorage.getItem("userID"));
                setFilteredTasks(temp1);
                console.log(temp1);
                break;
            case '3':
                console.log("All Issues");
                setFilteredTasks(tasks);
                console.log(tasks);
                break;
            case '4':
                console.log("Open Issues");
                let temp2 = tasks.filter(task => task.status === "0" );
                setFilteredTasks(temp2);
                console.log(temp2);
                break;
            case '5':
                console.log("Done Issues");
                let temp3 = tasks.filter(task => task.status === "1" );
                setFilteredTasks(temp3);
                console.log(temp3);
                break;
            default:
                console.log("Error: No filter matching for selected item");
        }
    }

    //Handle showing project settings
    function showProjectSettings(){
        setSelected(6);
        setCurrentView("settings");
    }

    //Handle deleting the current project
    function deleteProject(){
        Axios.delete('http://localhost:8000/api/projects/'+currentProj._id)
            .then(res =>{
                //Remove project from all projects
                const tempProjects = allProjects.filter(project => project._id != currentProj._id);
                console.log("Temp Proj", tempProjects);
                setAllProjects(tempProjects);
                //If no more projects left then navigate to welcom
                if(tempProjects.length < 1){
                    navigate('/welcome');
                }else{
                    //Set the current project to the first in the project list
                    setCurrentProj(tempProjects[0]);
                }
                
            })
            .catch(err =>{
                console.log(err);
            })
    }

    if(currentProj === null) return <div>Loading...</div>

    return (
        <div className="row">
            <div className="col">
            <div className={ styles.sidebar }>
            <div className={ styles.sidebarContent }>
                <div className={ styles.projectTitleDiv }>
                    <img className={ styles.logo } src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Picasa.svg/256px-Picasa.svg.png" alt="logo"/>
                    <div>
                        <span className={ styles.projectTitle }>{currentProj.name}</span>
                    </div>
                </div>
                <svg width="240" height="24">
                    <rect x="4" y="12" rx="2" ry="2" width="220" height="1"
                        style={{stroke:"black", strokeWidth:"1", opacity:"0.1"}} />
                </svg>
                <div className={ styles.currentSection }>Issues and Filters</div>
                <div id="1" onClick={handleClick} className={ (selected == 1) ? styles.currentlySelected : styles.link }>My open issues</div>
                <div id="2" onClick={handleClick} className={ (selected == 2) ? styles.currentlySelected : styles.link }>Reported by me</div>
                <div id="3" onClick={handleClick} className={ (selected == 3) ? styles.currentlySelected : styles.link }>All issues</div>
                <div id="4" onClick={handleClick} className={ (selected == 4) ? styles.currentlySelected : styles.link }>Open issues</div>
                <div id="5" onClick={handleClick} className={ (selected == 5) ? styles.currentlySelected : styles.link  }>Done issues</div>
                <svg width="240" height="24">
                    <rect x="4" y="12" rx="2" ry="2" width="220" height="1"
                        style={{stroke:"black", strokeWidth:"1", opacity:"0.1"}} />
                </svg>
                <div id="6" onClick={showProjectSettings} className={ (selected == 6) ? styles.currentlySelected : styles.link } >Project Settings</div>
                <div onClick={deleteProject} className={ styles.link + " text-danger"} >Delete Project</div>
            </div>
            <div className={ styles.collapseButtonDiv }>
                <svg className={ styles.collapseButton } width="26" height="26">
                    <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1" fill="white"/> 
                    <foreignObject x="7" y="-2" width="24" height="24">
                        <p style={{fontWeight:"bold"}}>{'<'}</p>
                    </foreignObject>
                </svg>
            </div>
        </div>
            </div>
        </div>
        
    )
}