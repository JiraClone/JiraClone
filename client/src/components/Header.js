import React, { useState, useEffect } from 'react';
import styles from './header.module.css';
import {Dropdown, ButtonGroup, Button, DropdownButton} from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import Axios from 'axios';

export default function Header() {

    function selectProject(id){
        //Code for when a project is selected in the dropdown menu
    }

    const [projects, setProjects] = useState([]);

    useEffect(() =>{
        //Load projects
        Axios.get('http://localhost:8000/api/projects')
            .then(projects =>{
                console.log(projects);
                setProjects(projects);
            })
    }, [])

    return (
        <div className={ styles.header }>
            <div>
                <img className={ styles.logo }src="https://cdn.dribbble.com/users/317366/screenshots/3696949/dribbble-icecream.png" alt="logo"/>
                <span className={ styles.brandName }>Geera Software</span>
                <span className={ styles.headerLinks }>Your Work</span>
                <Dropdown as={ButtonGroup}>
                    <DropdownToggle style={{"backgroundColor":"transparent", "border": "none"}}><span className={ styles.headerLinks }>Projects</span></DropdownToggle>
                    <Dropdown.Menu>
                        {
                            projects.map(project => 
                                <Dropdown.Item onSelect={() => selectProject(project._id)} >{project.name}</Dropdown.Item>
                            )
                        }
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">+ Create Project</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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