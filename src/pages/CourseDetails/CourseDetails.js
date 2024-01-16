import './CourseDetails.css';
import Template from "../../components/Template/Template";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getCourseById,
    getEnrolledStudents, removeCourseRequest,
    selectSelectedCourse,
    unenrollStudentRequest, updateCourseRequest
} from "../../features/auth/courseSlice";
import { Button, Col, Form, Row } from "react-bootstrap";
import moment from "moment";

function CourseDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { course, students, updateToggle } = useSelector(selectSelectedCourse);
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ schedule, setSchedule ] = useState("");

    useEffect(() => {
        dispatch(getCourseById({id}));
        dispatch(getEnrolledStudents({id}));
    }, [ id, dispatch ]);

    function removeStudent(studentId) {
        dispatch(unenrollStudentRequest({courseId: id, studentId: studentId}));
    }

    useEffect(() => {
        dispatch(getCourseById({id}));
        dispatch(getEnrolledStudents({id}));
    }, [ updateToggle, dispatch, id ]);

    useEffect(() => {
        if (course) {
            setName(course.name);
            setDescription(course.description);
            setSchedule(moment(course.schedule).format("YYYY-MM-DD"));
        }
    }, [ course ]);

    function updateCourse() {
       dispatch(updateCourseRequest({id, name, description, schedule: moment(schedule).format("YYYY-MM-DDTHH:mm:ss")}));
    }

    function removeCourse() {
        dispatch(removeCourseRequest({ id }));
    }

    return (
        <Template>
            {course && (<>
            <Row>
                <Col xs="3">
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Name" value={name}
                                          onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label column sm="2">Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" value={description}
                                          onChange={e => setDescription(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="schedule">
                            <Form.Label column sm="2">Schedule</Form.Label>
                            <Form.Control type="date" placeholder="schedule" value={schedule}
                                          onChange={e => setSchedule(e.target.value)}/>
                        </Form.Group>

                        <Button variant="primary" onClick={updateCourse}>Update</Button>
                        <Button variant="danger" onClick={removeCourse}>Remove</Button>
                    </Form>
                </Col>
                <Col xs="7">
                    <h4>Enrolled Students</h4>
                    {students.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Student Email</th>
                                <th>Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.firstName} {student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td onClick={() => removeStudent(student.id)}>-</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    ) : (
                        <h5>No students enrolled</h5>
                    )}
                </Col>
                </Row>
            </>)}
        </Template>
    );
}

export default CourseDetails;
