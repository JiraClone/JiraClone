import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NewTask from '../components/NewTask';
import TaskParent from '../components/TaskParent';
import { Modal, Button } from 'react-bootstrap';

export default function Main(props) {
    const [show, setShow] = useState(false);
    // const [submitFunction, setSubmitFunction] = useState(null);

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
                    <Sidebar />
                </div>
                <div className="col-9">
                    <TaskParent id={props.id} />
                </div>
            </div>
        </>
    );
}
