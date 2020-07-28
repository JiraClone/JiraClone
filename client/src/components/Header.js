import React, { useState, useEffect } from 'react';
import styles from './header.module.css';
import {Dropdown, ButtonGroup} from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import Axios from 'axios';
import { navigate } from '@reach/router';

export default function Header() {

    const [projects, setProjects] = useState(null);

    //Function to handle when a project is selected in the dropdown menu
    function selectProject(id){
        navigate('/projects/'+id);
    }

    //Function to create a new project
    function createProject(){
        //Get value from projectName component
        const name = document.getElementById('projectName').value;
        console.log(name);
        Axios.post('http://localhost:8000/api/projects', {name}, {withCredentials: true})
            .then(res =>{
                const updatedProjects = [...projects, res.data.project];
                console.log(updatedProjects);
                setProjects(updatedProjects);
            })
            .catch(err => console.log(err));
    }

    useEffect(() =>{
        //Load projects
        Axios.get('http://localhost:8000/api/projects', {withCredentials: true})
            .then(projects =>{
                console.log(projects);
                setProjects(projects.data);
            })
    }, [])

    //Component wrapper on Bootstrap Dropdown to make sure dropdown menu doesn't close after selecting something
    const DropdownPersist = (props) => {
        const [open, setOpen] = useState(false);
        const onToggle = (isOpen, ev, metadata) => {
          if (metadata.source === "select" || metadata.source === "change") {
              console.log(metadata.source);
            setOpen(true);
            return;
          }
          setOpen(isOpen);
        };
        return <Dropdown show={open} onToggle={onToggle} {...props}></Dropdown>;
      };

    return (
        <div className={ styles.header }>
            <div>
                <img className={ styles.logo }src="https://cdn.dribbble.com/users/317366/screenshots/3696949/dribbble-icecream.png" alt="logo"/>
                <span className={ styles.brandName }>Geera Software</span>
                <span className={ styles.headerLinks }>Your Work</span>
                <DropdownPersist as={ButtonGroup} >
                    <DropdownToggle style={{"backgroundColor":"transparent", "border": "none"}}><span className={ styles.headerLinks }>Projects</span></DropdownToggle>
                    <Dropdown.Menu>
                        {
                            projects &&
                            projects.map(project => 
                                <Dropdown.Item key={project._id} onSelect={() => selectProject(project._id)} >{project.name}</Dropdown.Item>
                            )
                        }
                        <Dropdown.Divider />
                        <Dropdown.Item onSelect={createProject}>+ Create New Project</Dropdown.Item>
                        <Dropdown.Item>
                            <input id="projectName" type="text" placeholder="New project name"/>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </DropdownPersist>
                <span className={ styles.headerLinks }>Filters</span>
                <button className={ styles.createButton }>Create</button>
            </div>
            
            <div className={ styles.logoDiv }>
                <img className={ styles.userLogo }src="https://www.underconsideration.com/brandnew/archives/boundless_logo_detail.png" alt="user"/>
                <span className={ styles.userProfileText }>Your profile and settings</span>
            </div>
        </div>
    )
}