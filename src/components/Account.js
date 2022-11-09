import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/auth.context";

export function Account(props) {
    const { renderAreasOfInfluence } = props
    const { user } = useContext(AuthContext)
    const { email, username, type, organization, position, party, areasOfInfluence } = user

    return (
        <div className="page">
            <div className="hero"></div>
            <div className="overlay-hero"></div>
            <div className="inner-hero">
                <h2>Account</h2>
                <p>User: {username}</p>
                <p>Email: {email}</p>
                <p>You are a {type}.</p>
                <p style={{ display: type === "lobbyist" ? "block" : "none" }}>Organization: {organization || "none"}</p>
                <p style={{ display: type === "politician" ? "block" : "none" }}>Position: {position || "none"}</p>
                <p style={{ display: type === "politician" ? "block" : "none" }}>Party: {party || "none"}</p>
                {renderAreasOfInfluence(type, areasOfInfluence)}
                <LinkContainer to={`/edit/${type}`} className="mb-3">
                    <button>Edit Account</button>
                </LinkContainer>
                <LinkContainer to="/services" className="mb-3">
                    <button>Services</button>
                </LinkContainer>
            </div>
        </div>
    )
}
