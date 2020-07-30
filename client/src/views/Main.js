import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NewTask from '../components/NewTask';
import TaskParent from '../components/TaskParent';
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';
import ProjectSettings from '../components/ProjectSettings';
import io from 'socket.io-client';

export default function Main(props) {
    const [show, setShow] = useState(false);

    const [allUsers, setAllUsers] = useState(null);

    const [allProjects, setAllProjects] = useState(null);
    const [currentProj, setCurrentProj] = useState(null);
    // const [submitFunction, setSubmitFunction] = useState(null);

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [currentView, setCurrentView] = useState("tasks");

    const [socket] = useState(() => io(':8000'));

    useEffect(() =>{
        socket.on('new task added', newTask => {
            setTasks(prevIssues => {
                return [...prevIssues, newTask];
            })
        })

        return () => socket.disconnect(true);
    }, [socket])

    useEffect(() => {
        Axios.get(
            'http://localhost:8000/api/projects/user/' +
                localStorage.getItem('userID'),
            { withCredentials: true }
        ).then((projects) => {
            // console.log(projects.data)
            // console.log("Projects:",projects.data[0].tasks);
            setAllProjects(projects.data);
            //updating currentProj to a default
            setCurrentProj(projects.data[0]);
            setFilteredTasks(projects.data[0].tasks);
            setTasks(projects.data[0].tasks);
        });

        Axios.get('http://localhost:8000/api/users', {
            withCredentials: true,
        }).then((users) => setAllUsers(users.data));
    }, []);

    useEffect(() => {});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (allProjects == null) {
        return <p>Loading...</p>;
    }

    console.log('props',props.id)

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Header
                        showModal={handleShow}
                        setCurrentProject={setCurrentProj}
                        projects={allProjects}
                        setTasks={setTasks}
                        setFilteredTasks={setFilteredTasks}
                    />
                </div>
            </div>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className="ml-1">
                        {/* <div className="col"> */}
                        <Modal.Title>Create issue</Modal.Title>
                        {/* </div>
                        <div className="row col">
                            <Button variant="light">Import issues</Button>
                            {/* will need to create a drop down 
                            <Button variant="light">Configure fields</Button>
                        </div> */}
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <NewTask
                        closeModal={handleClose}
                        currentProject={currentProj}
                        projects={allProjects}
                        users={allUsers}
                        setTasks = {setTasks}
                        // onSubmit={(f) => setSubmitFunction(f)}
                    />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="primary" onClick={submitFunction}>
                        Create
                    </Button>
                </Modal.Footer> */}
            </Modal>

            <div className="row">
                <div className="col-2">
                    <Sidebar
                        tasks={tasks}
                        setTasks={setTasks}
                        filteredTasks={filteredTasks}
                        setFilteredTasks={setFilteredTasks}
                        setCurrentView={setCurrentView}
                        currentProj = {currentProj}
                    />
                </div>
                {
                    (currentView === "tasks") ?
                    <div className="col-9">
                        <TaskParent
                            id={props.id}
                            filteredTasks={filteredTasks}
                            currentProject={currentProj}
                            allUsers={allUsers}
                        />
                    </div>
                    :
                    <div className="col-9">
                        <ProjectSettings
                            currentProj={currentProj}
                            setCurrentView={setCurrentView}
                        />
                    </div>
                }
            </div>
        </>
    );
}
