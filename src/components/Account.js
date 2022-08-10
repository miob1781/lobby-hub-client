import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Account(props) {
    const {renderAreasOfInfluence} = props
    const navigate = useNavigate()
    const {user, logOutUser} = useContext(AuthContext)
    const {_id, email, username, type, organization, position, party, areasOfInfluence} = user

    const deleteAccount = (event) => {
        axios.delete(`${process.env.REACT_APP_URL}/auth/user/${_id}`)
            .then(() => {
                logOutUser()
                navigate("/")
            })
            .catch(err => {
                console.log("An error has occurred while deleting a user:", err)
            })
    }

    return (
        <div>
            <h2>Account</h2>
            <p>User: {username}</p>
            <p>Email: {email}</p>
            <p>You are a {type}.</p>
            <p style={{ display: type === "lobbyist" ? "block" : "none" }}>Organization: {organization || "none"}</p>
            <p style={{ display: type === "politician" ? "block" : "none" }}>Position: {position || "none"}</p>
            <p style={{ display: type === "politician" ? "block" : "none" }}>Party: {party || "none"}</p>
            {renderAreasOfInfluence(type, areasOfInfluence)}
            <NavLink to={`/edit/${type}`}>
                <button>Edit Account</button>
            </NavLink>
            <form>
                <button type="button" onClick={deleteAccount}>Delete Account</button>
            </form>
            <NavLink to="/services">
                <button>Services</button>
            </NavLink>
        </div>
    )
}
