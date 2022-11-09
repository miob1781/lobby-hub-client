import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
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
                <div className="mb-3 mt-3">
                    <Card.Title>{_id ? "Edit your user data" : "Signup"}</Card.Title>
                </div>
                <Form onSubmit={_id ? submitUpdate : submitSignup}>
                    <Row className="mb-3">
                        <Form.Label column="md" htmlFor="username">Username:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                id="username"
                                value={username}
                                onChange={({ target }) => handleInputChange(target, "username")}
                                autoComplete="username"
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label column="md" htmlFor="email">Email:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="email"
                                id="email"
                                value={email}
                                onChange={({ target }) => handleInputChange(target, "email")}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label column="md" htmlFor="password">Password:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="password"
                                id="password"
                                value={password}
                                onChange={({ target }) => handleInputChange(target, "password")}
                                autoComplete={_id ? "current-password" : "new-password"}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3" style={{ display: type === "lobbyist" ? "flex" : "none" }}>
                        <Form.Label column="md" htmlFor="organization">Organization:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                id="organization"
                                value={organization}
                                onChange={({ target }) => handleInputChange(target, "organization")}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3" style={{ display: type === "politician" ? "flex" : "none" }}>
                        <Form.Label column="md" htmlFor="position">Position:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                id="position"
                                value={position}
                                onChange={({ target }) => handleInputChange(target, "position")}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3" style={{ display: type === "politician" ? "flex" : "none" }}>
                        <Form.Label column="md" htmlFor="party">Party:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                id="party"
                                value={party}
                                onChange={({ target }) => handleInputChange(target, "party")}
                            />
                        </Col>
                    </Row>
                    <div className="mb-3" style={{ display: type === "politician" ? "flex" : "none" }}>
                        {type === "politician" && (areasOfInfluence.length > 0 || !_id) &&
                            <KeywordsList areasOfInfluence={areasOfInfluence} setFormData={setFormData} />}
                    </div>
                    <Row className="mb-3 mt-4 justify-content-center">
                        <Col xs="4">
                            <Button>{_id ? "Edit" : "Signup!"}</Button>
                        </Col>
                        <Col xs="4">
                            <LinkContainer to="/">
                                <Button type="button">Back</Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}
