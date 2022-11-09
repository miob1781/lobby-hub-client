import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export function Home() {
    return (
        <div className="page">
            <div className="overlay-hero"></div>
            <div className="hero"></div>
            <div className="outer-container">
                <div className="title-container">
                    <h1>Welcome to LobbyHub!</h1>
                </div>
                <div className="inner-container">
                    <div id="signup-lobbyist">
                        <p>I want to buy political services.</p>
                        <LinkContainer to="/signup/lobbyist">
                            <Button>Register as lobbyist</Button>
                        </LinkContainer>
                    </div>
                    <div>
                        <p>I want to sell political services.</p>
                        <LinkContainer to="/signup/politician">
                            <Button>Register as politician</Button>
                        </LinkContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
