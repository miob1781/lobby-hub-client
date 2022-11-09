import { Card } from "react-bootstrap"

export function OurMission() {
    return (
        <div className="page">
            <div className="hero"></div>
            <div className="overlay-hero"></div>
            <Card body style={{zIndex: "3", width: "min(80vw, 400px)"}}>
                <Card.Title>Our Mission</Card.Title>
                <Card.Text className="text-start">Here we will tell you how we completely turn the lobbying bussiness upside down.</Card.Text>
            </Card>
        </div>
    )
}
