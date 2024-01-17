import './Login.css';
import Template from "../../components/Template/Template";
import { Button, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, selectIsLoggedIn } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [ isLoggedIn, navigate ]);

    const login = () => {
        dispatch(loginRequest({username: email, password: password}));
    }

    return (
        <Template>
            <div className="Login">
                <Form>
                    <Col xs="3">
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" value={email}
                                          onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label column sm="2">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password}
                                          onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" onClick={login}>Login</Button>
                    </Col>
                </Form>
            </div>
        </Template>
    );
}

export default Login;
