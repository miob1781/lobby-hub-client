import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, ButtonToolbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import axios from "axios";
import { KeywordsList } from "./KeywordsList";
import { AuthContext } from "../context/auth.context";

export function Signup(props) {
    const { type } = useParams();
    const navigate = useNavigate();
    const { user, storeToken, authenticateUser, setUser } = useContext(AuthContext);
    const authToken = localStorage.getItem("authToken")

    const [formData, setFormData] = useState(user);
    const [errorMessage, setErrorMessage] = useState("");

    const { _id, username, email, password, position, party, organization, areasOfInfluence } = formData
    let userData
    if (type === "lobbyist") {
        userData = { username, email, password, type, organization }
    } else {
        userData = { username, email, password, type, position, party, areasOfInfluence }
    }

    const handleInputChange = (target, category) => {
        setFormData(prevUser => {
            return { ...prevUser, [category]: target.value }
        })
    }

    const submitSignup = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/auth/signup`, userData)
            .then((response) => {
                storeToken(response.data.authToken)
                authenticateUser()
            })
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    }

    const submitUpdate = (event) => {
        event.preventDefault()
        axios.put(`${process.env.REACT_APP_URL}/auth/user/${_id}`, userData, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(({ data }) => {
                setUser(data)
                setFormData(data)
                navigate('/')
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <Container className="d-flex justify-content-center">
            <div className="overlay-hero"></div>
            <div className="hero"></div>
            <Card body style={{ zIndex: "3", width: "min(300px, 80vw)", marginTop: "5vw" }}>
                <div className="my-3">
                    <Card.Title>{_id ? "Edit your user data" : "Signup"}</Card.Title>
                </div>
                <Form onSubmit={_id ? submitUpdate : submitSignup}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column="md">Username:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={({ target }) => handleInputChange(target, "username")}
                                autoComplete="username"
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column="md">Email:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={({ target }) => handleInputChange(target, "email")}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column="md">Password:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={({ target }) => handleInputChange(target, "password")}
                                autoComplete={_id ? "current-password" : "new-password"}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" style={{ display: type === "lobbyist" ? "flex" : "none" }}>
                        <Form.Label column="md">Organization:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                value={organization}
                                onChange={({ target }) => handleInputChange(target, "organization")}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" style={{ display: type === "politician" ? "flex" : "none" }}>
                        <Form.Label column="md">Position:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                value={position}
                                onChange={({ target }) => handleInputChange(target, "position")}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" style={{ display: type === "politician" ? "flex" : "none" }}>
                        <Form.Label column="md">Party:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                value={party}
                                onChange={({ target }) => handleInputChange(target, "party")}
                            />
                        </Col>
                    </Form.Group>
                    <div className="mb-3" style={{ display: type === "politician" ? "flex" : "none" }}>
                        {type === "politician" && (areasOfInfluence.length > 0 || !_id) ?
                            <KeywordsList areasOfInfluence={areasOfInfluence} setFormData={setFormData} /> : null}
                    </div>
                    <ButtonToolbar className="mb-3 mt-4 justify-content-center">
                        <Button variant="success" className="mx-1">{_id ? "Edit" : "Signup!"}</Button>
                        <LinkContainer to="/">
                            <Button type="button" className="mx-1">Back</Button>
                        </LinkContainer>
                    </ButtonToolbar>
                </Form>
            </Card>
        </Container>
    )
}
