import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NewTask from '../components/NewTask';
import TaskParent from '../components/TaskParent';
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function Main(props) {
    const [show, setShow] = useState(false);
    // const [submitFunction, setSubmitFunction] = useState(null);

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() =>{
        Axios.get('http://localhost:8000/api/tasks')
            .then(res =>{
                setTasks(res.data);
                setFilteredTasks(res.data);
            })
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Header showModal={handleShow} />
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
                    <Sidebar tasks={tasks} setTasks={setTasks} filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} />
                </div>
                <div className="col-9">
                    <TaskParent id={props.id} filteredTasks={filteredTasks} />
                </div>
            </div>
        </>
    );
}
