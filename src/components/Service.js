import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Card, Button, ButtonToolbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export function Service(props) {
    const { renderAreasOfInfluence } = props
    const { serviceId } = useParams()
    const { user } = useContext(AuthContext)
    const { type } = user
    const navigate = useNavigate()
    const authToken = localStorage.getItem("authToken")

    const [service, setService] = useState(null)
    const [matchingPoliticians, setMatchingPoliticians] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/services/${serviceId}`, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(res => {
                setService(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading service from DB:", err);
            })
    }, [])

    useEffect(() => {
        if (!service) return;
        axios.post(`${process.env.REACT_APP_URL}/services/politicians`, { areasOfInfluence: service.areasOfInfluence }, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(res => {
                setMatchingPoliticians(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading politicians matching service:", err);
            })
    }, [service])

    const deleteService = () => {
        axios.delete(`${process.env.REACT_APP_URL}/services/${serviceId}`, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(() => {
                navigate("/services")
            })
            .catch(err => {
                console.log("An error has occurred while deleting a service:", err)
            })
    }

    const acceptOffer = () => {
        axios.put(`${process.env.REACT_APP_URL}/services/${serviceId}/accept-offer`, { politician: user._id }, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(response => {
                setService(response.data)
            })
            .catch(err => {
                console.log("An error has occurred while accepting an offer:", err)
            })
    }

    const renderPoliticians = (politicians, hasAccepted) => {
        return politicians?.map(politician => (
            <Card body key={politician?._id} bg={hasAccepted ? "success" : "primary"} text="white" className="m-2" style={{ width: "min(300px, 80vw)" }}>
                <Card.Title className="mb-3">Name: {politician?.username}</Card.Title>
                <Card.Text className="mb-3">Email: {politician?.email}</Card.Text>
                <Card.Text className="mb-3">Position: {politician?.position}</Card.Text>
                <Card.Text className="mb-3">Party: {politician?.party}</Card.Text>
                {politician ? renderAreasOfInfluence("politician", politician?.areasOfInfluence) : null}
            </Card>
        ))
    }

    if (!service) return <p>Loading service...</p>
    if (!matchingPoliticians || matchingPoliticians.length === 0) return <p>Loading politicians matching your request...</p>
    return (
        <Container>
            <h2 className="h2 mb-3">{service.title}</h2>
            <p className="mb-3" style={{ display: type === "politician" && service?.politicians.find(pol => pol._id === user._id) ? "block" : "none" }}>You have accepted this offer.</p>
            <p className="mb-3">Description: {service.description}</p>
            <div className="mb-3" style={{ display: type === "politician" ? "block" : "none" }}>
                <p>Requested by: {service?.lobbyist?.username}</p>
                <p>Organization: {service?.lobbyist?.organization}</p>
            </div>
            {renderAreasOfInfluence("politician", service?.areasOfInfluence)}
            <p className="mb-3">Financial benefit: {service?.financialOffer} $</p>
            <p className="mb-3">Other benefits: {service?.otherOffers}</p>
            <div style={{ display: type === "lobbyist" ? "block" : "none" }}>
                {service.politicians.length === 0
                    ? <p className="mb-3">So far no politician has accepted your offer.</p>
                    : <div>
                        <p className="mb-3">These politicians have accepted your offer:</p>
                        <Row className="d-flex justify-content-center">
                            {renderPoliticians(service?.politicians, true)}
                        </Row>
                    </div>}
            </div>
            <div style={{ display: type === "lobbyist" ? "block" : "none" }}>
                <p className="my-3">Politicians matching your request:</p>
                <Row className="d-flex justify-content-center">
                    {renderPoliticians(matchingPoliticians, false)}
                </Row>
            </div>
            <ButtonToolbar className="d-flex justify-content-center my-3">
                <Button type="button" onClick={acceptOffer} className="mx-1" style={{ display: type === "politician" && !service?.politicians.find(pol => pol._id === user._id) ? "inline-block" : "none" }}>Accept Offer</Button>
                <Button type="button" variant="danger" onClick={deleteService} className="mx-1" style={{ display: type === "lobbyist" ? "inline-block" : "none" }}>Delete</Button>
                <LinkContainer to={`/services/form/${serviceId}`} className="mx-1" style={{ display: type === "lobbyist" ? "inline-block" : "none" }}>
                    <Button>Edit</Button>
                </LinkContainer>
                <LinkContainer to="/services" className="mx-1">
                    <Button>Back</Button>
                </LinkContainer>
            </ButtonToolbar>
        </Container>
    )
}
