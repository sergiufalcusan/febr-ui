import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { currentUserRequest, selectFirstName, selectIsLoggedIn, selectRole } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { logout as authLogout } from "../../features/auth/authSlice";
import { logout as teacherLogout } from "../../features/auth/teacherSlice";
import { logout as studentLogout } from "../../features/auth/studentSlice";
import { logout as courseLogout } from "../../features/auth/courseSlice";
import { useNavigate } from "react-router-dom";

function Header() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const firstName = useSelector(selectFirstName);
    const role = useSelector(selectRole);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(currentUserRequest({ token: localStorage.getItem("token") }));
        }
    }, [dispatch, isLoggedIn]);

    const logout = () => {
        dispatch(authLogout());
        dispatch(teacherLogout());
        dispatch(studentLogout());
        dispatch(courseLogout());
        navigate("/");
    }

    return (
        <header className="App-header">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Nav.Link href="/">Febr.io</Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {isLoggedIn && role === "ROLE_ADMIN" && (
                                <NavDropdown title="Admin" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/teachers">Teachers</NavDropdown.Item>
                                    <NavDropdown.Item href="/courses">Courses</NavDropdown.Item>
                                    <NavDropdown.Item href="/students">Students</NavDropdown.Item>
                                </NavDropdown>
                            )}
                            {isLoggedIn && role === "ROLE_TEACHER" && (
                                <NavDropdown title="Teacher" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/courses">Courses</NavDropdown.Item>
                                    <NavDropdown.Item href="/students">Students</NavDropdown.Item>
                                </NavDropdown>
                            )}
                            {isLoggedIn && role === "ROLE_STUDENT" && (
                                <NavDropdown title="Student" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/courses">Courses</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                        {!isLoggedIn ? (
                            <Nav.Link href="/login" className="justify-content-end">Login</Nav.Link>
                        ) : (<>
                                <Nav.Link href="/" className="justify-content-end">Welcome {firstName} &nbsp;</Nav.Link>
                                <Nav.Link className="justify-content-end" onClick={logout}>Logout</Nav.Link>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;