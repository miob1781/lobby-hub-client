import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Card, Form, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

export function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleUsername = ({ target }) => setUsername(target.value);
    const handlePassword = ({ target }) => setPassword(target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };

        axios.post(`${process.env.REACT_APP_URL}/auth/login`, requestBody)
            .then((response) => {
                console.log('JWT token:', response.data.authToken);
                storeToken(response.data.authToken)
                authenticateUser()
                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="page">
            <div className="hero"></div>
            <div className="overlay-hero"></div>
            <Card body style={{zIndex: "3", width: "min(280px, 80vw)"}}>
                <Card.Title className="mb-3">Login</Card.Title>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            autoComplete="username"
                            onChange={handleUsername}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={handlePassword}
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit" className="btn-success">Login</Button>
                    </div>
                    <div className="mb-3">
                        {errorMessage ? <Form.Text className="text-danger">{errorMessage}</Form.Text> : null}
                    </div>
                </Form>
                <div style={{ borderTop: "1.5px solid grey" }}>
                    <div className="mt-3">
                        <Form.Text>Don't have an account yet?</Form.Text>
                    </div>
                    <LinkContainer to="/signup/lobbyist" className="mb-3 mt-3">
                        <Button>Register as lobbyist</Button>
                    </LinkContainer>
                    <LinkContainer to="/signup/politician" className="mb-3">
                        <Button>Register as politician</Button>
                    </LinkContainer>
                </div>
            </Card>
        </div>
    )
}
