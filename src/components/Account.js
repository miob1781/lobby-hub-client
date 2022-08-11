import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Account(props) {
    const { renderAreasOfInfluence } = props
    const navigate = useNavigate()
    const { user, logOutUser } = useContext(AuthContext)
    const { _id, email, username, type, organization, position, party, areasOfInfluence } = user
    const authToken = localStorage.getItem("authToken")

    const deleteAccount = (event) => {
        axios.delete(`${process.env.REACT_APP_URL}/auth/user/${_id}`, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(() => {
                logOutUser()
                navigate("/")
            })
            .catch(err => {
                console.log("An error has occurred while deleting a user:", err)
            })
    }

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
                <form className="link end-buttons">
                    <button type="button" onClick={deleteAccount}>Delete Account</button>
                </form>
                <NavLink to="/services" className="link end-buttons">
                    <button>Services</button>
                </NavLink>
            </div>
        </div>
    )
}
