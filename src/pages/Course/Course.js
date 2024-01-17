import './Course.css';
import Template from "../../components/Template/Template";
import { useDispatch, useSelector } from "react-redux";
import {
    createNewCourse,
    enrollStudentRequest,
    getAllCourses,
    selectAllCourses,
    selectUpdateToggle
} from "../../features/courseSlice";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import moment from 'moment';
import { selectRole } from "../../features/authSlice";
import { getAllStudents, selectAllStudents } from "../../features/studentSlice";
import { useNavigate } from "react-router-dom";

function Course() {
    const courses = useSelector(selectAllCourses);
    const updateToggle = useSelector(selectUpdateToggle);
    const role = useSelector(selectRole);
    const dispatch = useDispatch();
    const students = useSelector(selectAllStudents);

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ schedule, setSchedule ] = useState("");

    const [ student, setStudent ] = useState("");
    const [ course, setCourse ] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllCourses({role}));
        dispatch(getAllStudents());
    }, [ role, dispatch ]);

    useEffect(() => {
        dispatch(getAllCourses({role}));
    }, [ updateToggle, dispatch, role ]);

    function createCourse() {
        dispatch(createNewCourse({ name, description, schedule: moment(schedule).format("YYYY-MM-DDTHH:mm:ss") }));
    }

    function enrollStudent() {
        dispatch(enrollStudentRequest({ studentId: student, courseId: course }));
    }

    function onClickCourse(id) {
        if (role === "ROLE_TEACHER") {
            navigate(`/course/${id}`);
        }
    }

    return (
        <Template>
            <h4>Courses</h4>
            <Table className={`mt-5`} striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Schedule</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course, i) => (
                    <tr key={i} onClick={() => onClickCourse(course.id)}>
                        <td>{course.name}</td>
                        <td>{course.description}</td>
                        <td>{course.schedule}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {role === "ROLE_TEACHER" && (
                <Row className={`mt-5`}>
                    <Col xs="3">
                        <h4 className={`mb-4`}>Create new course</h4>
                        <Form>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder="Name" value={name}
                                              onChange={e => setName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="description">
                                <Form.Label column sm="2">Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" value={description}
                                              onChange={e => setDescription(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="schedule">
                                <Form.Label column sm="2">Schedule</Form.Label>
                                <Form.Control type="date" placeholder="schedule" value={schedule}
                                              onChange={e => setSchedule(e.target.value)}/>
                            </Form.Group>

                            <Button variant="primary" onClick={createCourse}>Create course</Button>
                        </Form>
                    </Col>
                    <Col xs="3">
                        <h4 className={`mb-3`}>Enroll student</h4>
                        <Form>
                            <Form.Group className="mb-2" controlId="student">
                                <Form.Label column>Select student</Form.Label>
                                <Form.Select aria-label="Select student" onChange={e => setStudent(e.target.value)}>
                                    <option>Select student</option>
                                    {students.map((student, i) => (
                                        <option key={i}
                                                value={student.id}>{student.firstName} {student.lastName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="course">
                                <Form.Label column>Select course</Form.Label>
                                <Form.Select aria-label="Select course" onChange={e => setCourse(e.target.value)}>
                                    <option>Select course</option>
                                    {courses.map((course, i) => (
                                        <option key={i} value={course.id}>{course.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" onClick={enrollStudent}>Enroll</Button>
                        </Form>
                    </Col>
                </Row>
            )}
        </Template>
    );
}

export default Course;
