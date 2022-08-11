import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export function Account(props) {
    const { renderAreasOfInfluence } = props
    const { user, logOutUser } = useContext(AuthContext)
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
                <NavLink to={`/edit/${type}`} className="link end-buttons">
                    <button>Edit Account</button>
                </NavLink>
                <NavLink to="/services" className="link end-buttons">
                    <button>Services</button>
                </NavLink>
            </div>
        </div>
    )
}
