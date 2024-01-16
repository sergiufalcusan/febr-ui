import './Teacher.css';
import Template from "../../components/Template/Template";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createNewTeacher,
    getAllTeachers,
    selectAllTeachers,
    selectUpdateToggle
} from "../../features/auth/teacherSlice";
import Table from "react-bootstrap/Table";
import { Button, Col, Form } from "react-bootstrap";

function Teacher() {
    const teachers = useSelector(selectAllTeachers);
    const updateToggle = useSelector(selectUpdateToggle);
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");

    useEffect(() => {
        dispatch(getAllTeachers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllTeachers());
    }, [updateToggle, dispatch]);

    function createTeacher() {
        dispatch(createNewTeacher({firstName: firstName, lastName: lastName, email: email, password: password}));
    }

    return (
        <Template>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers.map((teacher, i) => (
                        <tr key={i}>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>{teacher.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

            <Form>
                <Col xs="3">
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" value={email}
                                      onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="firstname">
                        <Form.Label column sm="2">Firstname</Form.Label>
                        <Form.Control type="email" placeholder="First Name" value={firstName}
                                      onChange={e => setFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastname">
                        <Form.Label column sm="2">Lastname</Form.Label>
                        <Form.Control type="email" placeholder="Last Name" value={lastName}
                                      onChange={e => setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label column sm="2">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" onClick={createTeacher}>Create Teacher</Button>
                </Col>
            </Form>
        </Template>
    );
}

export default Teacher;
