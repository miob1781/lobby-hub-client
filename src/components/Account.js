import { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/auth.context";

export function Account(props) {
    const { renderAreasOfInfluence } = props
    const { user } = useContext(AuthContext)
    const { email, username, type, organization, position, party, areasOfInfluence } = user

    return (
        <Container className="d-flex justify-content-center">
            <div className="overlay-hero"></div>
            <div className="hero"></div>
            <Card body style={{ zIndex: "3", width: "min(360px, 80vw)", marginTop: "5vw" }}>
                <Card.Title className="mb-3 mt-3">Account</Card.Title>
                <Card.Text className="mb-3">User: {username}</Card.Text>
                <Card.Text className="mb-3">Email: {email}</Card.Text>
                <Card.Text className="mb-3">You are a {type}.</Card.Text>
                <Card.Text className="mb-3" style={{ display: type === "lobbyist" ? "block" : "none" }}>Organization: {organization || "none"}</Card.Text>
                <Card.Text className="mb-3" style={{ display: type === "politician" ? "block" : "none" }}>Position: {position || "none"}</Card.Text>
                <Card.Text className="mb-3" style={{ display: type === "politician" ? "block" : "none" }}>Party: {party || "none"}</Card.Text>
                {renderAreasOfInfluence(type, areasOfInfluence)}
                <Row className="justify-content-center mb-3 mt-3">
                    <Col xs="5">
                        <LinkContainer to={`/edit/${type}`} className="mb-3">
                            <Button>Edit Account</Button>
                        </LinkContainer>
                    </Col>
                    <Col xs="5">
                        <LinkContainer to="/services" className="mb-3">
                            <Button>Services</Button>
                        </LinkContainer>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}
