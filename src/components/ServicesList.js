import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, ButtonToolbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export function ServicesList(props) {
    const { user } = useContext(AuthContext)
    const { type, areasOfInfluence } = user
    const authToken = localStorage.getItem("authToken")

    const [agreedServices, setAgreedServices] = useState(null)
    const [matchingServices, setMatchingServices] = useState(null)
    const [typeOfServices, setTypeOfServices] = useState("agreed")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/services/${user?.type}/${user?._id}`, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(res => {
                setAgreedServices(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading services:", err);
            })
    }, [])

    useEffect(() => {
        if (type === "politician") {
            axios.post(`${process.env.REACT_APP_URL}/services/services-matching-keywords`, { areasOfInfluence }, { headers: { Authorization: `Bearer ${authToken}` } })
                .then(response => {
                    setMatchingServices(response.data)
                })
                .catch(err => {
                    console.log("An error has occurred while loading services matching keywords:", err)
                })
        }
    }, [])

    const renderServices = () => {
        const services = typeOfServices === "agreed" ? agreedServices : matchingServices
        if (!services) {
            return <p>Loading services...</p>
        }
        if (services.length === 0 && typeOfServices === "agreed") {
            return <p>You have not {type === "lobbyist" ? "offered" : "agreed to"} any services yet.</p>
        }
        if (services.length === 0 && typeOfServices === "matching") {
            return <p>There are no offers matching your areas of influence at the moment.</p>
        }
        return services?.map(service => (
            <Card body key={service._id} bg="primary" text="white" className="m-2" style={{width: "min(300px, 80vw)"}}>
                <Card.Title className="mb-3">{service.title}</Card.Title>
                <Card.Text className="mb-3">Financial benefits: {service.financialOffer} $</Card.Text>
                <Card.Text className="mb-3">Other benefits: {service.otherOffers}</Card.Text>
                <LinkContainer to={`/services/${service._id}`} className="mb-3">
                    <Button variant="light">Show Details</Button>
                </LinkContainer>
            </Card>
        ))
    }

    return (
        <Container>
            <h2 className="h2 mb-3">Services</h2>
            <Col className="d-flex justify-content-center mb-3">
                <LinkContainer to="/services/form/create" style={{ display: type === "lobbyist" ? "block" : "none" }} className="mb-3">
                    <Button variant="success">New Service</Button>
                </LinkContainer>
            </Col>
            <ButtonToolbar style={{ display: type === "politician" ? "block" : "none" }} className="justify-content-center mb-3">
                <Button type="button" variant="success" className="mx-1" onClick={() => setTypeOfServices("matching")}>Services matching your keywords</Button>
                <Button type="button" variant="success" className="mx-1" onClick={() => setTypeOfServices("agreed")}>Services you agreed on</Button>
            </ButtonToolbar>
            <Row className="d-flex justify-content-center">
                {renderServices()}
            </Row>
        </Container>
    )
}
