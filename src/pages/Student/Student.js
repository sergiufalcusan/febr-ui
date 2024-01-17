import './Student.css';
import Template from "../../components/Template/Template";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createNewStudent,
    getAllStudents,
    selectAllStudents,
    selectUpdateToggle
} from "../../features/studentSlice";
import Table from "react-bootstrap/Table";
import { Button, Col, Form } from "react-bootstrap";

function Student() {
    const students = useSelector(selectAllStudents);
    const updateToggle = useSelector(selectUpdateToggle);
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");

    useEffect(() => {
        dispatch(getAllStudents());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllStudents());
    }, [updateToggle, dispatch]);

    function createStudent() {
        dispatch(createNewStudent({firstName: firstName, lastName: lastName, email: email, password: password}));
    }

    return (
        <Template>
            <h4 className={`mb-3`}>Students</h4>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, i) => (
                    <tr key={i}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Form>
                <Col xs="3">
                    <h4 className={`mb-3`}>Create new student</h4>
                    <Form.Group className="mb-2" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" value={email}
                                      onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="firstname">
                        <Form.Label column sm="2">Firstname</Form.Label>
                        <Form.Control type="email" placeholder="First Name" value={firstName}
                                      onChange={e => setFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="lastname">
                        <Form.Label column sm="2">Lastname</Form.Label>
                        <Form.Control type="email" placeholder="Last Name" value={lastName}
                                      onChange={e => setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label column sm="2">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" onClick={createStudent}>Create Student</Button>
                </Col>
            </Form>
        </Template>
    );
}

export default Student;
