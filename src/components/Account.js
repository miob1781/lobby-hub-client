import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { EditAccount } from "./EditAccount";
import { ServicesSnippet } from "./ServicesSnippet";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Account(props) {
    const navigate = useNavigate()
    const {user, logOutUser} = useContext(AuthContext)
    const {_id, email, username, type, organization, position, party, areasOfInfluence} = user

    const renderAreasOfInfluence = () => {
        if (type !== "politician") return;
        let content = areasOfInfluence.reduce((acc, val) => {
            return acc += val + ", "
        }, "")
        content = content.slice(0, -2)
        return <p>Areas of influence: {content}</p>
    }

    const handleDeleteAccount = (event) => {
        axios.delete(`${process.env.REACT_APP_URL}/auth/user/${_id}/delete`)
            .then(() => {
                console.log("here to logout user");
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
            {renderAreasOfInfluence()}
            <NavLink to={`/edit/${type}`}>
                <button type="button">Edit Account</button>
            </NavLink>
            <form>
                <button type="button" onClick={handleDeleteAccount}>Delete Account</button>
            </form>
            <ServicesSnippet />
        </div>
    )
}
