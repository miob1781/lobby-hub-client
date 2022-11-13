import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, ButtonToolbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { KeywordsList } from "./KeywordsList";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function CreateService(pops) {
    const { createOrId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const authToken = localStorage.getItem("authToken")

    const initialFormData = {
        title: "",
        description: "",
        financialOffer: 0,
        otherOffers: "",
        areasOfInfluence: []
    }

    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState("");

    const { title, description, financialOffer, otherOffers, areasOfInfluence } = formData

    const handleInputChange = (target, category) => {
        setFormData(prevFormData => {
            return { ...prevFormData, [category]: target.value }
        })
    }

    const descriptionData = { title, description, financialOffer, otherOffers, areasOfInfluence, lobbyist: user._id }

    useEffect(() => {
        if (createOrId !== "create") {
            axios.get(`${process.env.REACT_APP_URL}/services/${createOrId}`, { headers: { Authorization: `Bearer ${authToken}` } })
                .then(({ data }) => {
                    setFormData(data)
                })
                .catch(err => {
                    console.log("An error has occurred while loading service:", err)
                })
        }
    }, [])

    const createService = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/services`, descriptionData, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(() => {
                setFormData(initialFormData)
                navigate("/services")
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    }

    const updateService = (event) => {
        event.preventDefault()
        axios.put(`${process.env.REACT_APP_URL}/services/${createOrId}`, descriptionData, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(() => {
                setFormData(initialFormData)
                navigate('/services')
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <Container className="d-flex justify-content-center">
            <div className="hero"></div>
            <div className="overlay-hero"></div>
            <Card body style={{ zIndex: "3", width: "min(300px, 80vw)", marginTop: "5vw" }}>
                <div className="mb-3 mt-3">
                    <Card.Title>{createOrId !== "create" ? "Edit" : "Offer"} Service</Card.Title>
                </div>
                <Form onSubmit={createOrId !== "create" ? updateService : createService}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column="md">Title:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={({ target }) => handleInputChange(target, "title")}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column="md">Description:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                as="textarea"
                                rows="5"
                                cols="20"
                                value={description}
                                onChange={({ target }) => handleInputChange(target, "description")}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column="md">Financial Benefits in $:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="number"
                                step="100"
                                value={financialOffer}
                                onChange={({ target }) => handleInputChange(target, "financialOffer")}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column="md">Other benefits:</Form.Label>
                        <Col xs="7">
                            <Form.Control
                                type="text"
                                value={otherOffers}
                                onChange={({ target }) => handleInputChange(target, "otherOffers")}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        {(areasOfInfluence.length > 0 || createOrId === "create") ?
                            <KeywordsList areasOfInfluence={areasOfInfluence} setFormData={setFormData} /> : null
                        }
                    </Form.Group>
                </Form>
                <ButtonToolbar className="my-3 justify-content-center">
                    <Button variant="success" className="mx-1">{createOrId !== "create" ? "Edit" : "Offer Service!"}</Button>
                    <LinkContainer to="/" className="mx-1">
                        <Button type="button">Back</Button>
                    </LinkContainer>
                </ButtonToolbar>
            </Card>
        </Container>
    )
}
