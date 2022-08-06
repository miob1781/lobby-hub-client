import { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { EditAccount } from "./EditAccount";
import { ServicesSnippet } from "./ServicesSnippet";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Account(props) {
    const {user} = useContext(AuthContext)
    const {_id, email, username, type, organization, position, party, areasOfInfluence} = user

    const renderAreasOfInfluence = () => {
        let content = areasOfInfluence.reduce((acc, val) => {
            return acc += val + ", "
        }, "")
        content = content.slice(0, -2)
        return <span>{content}</span>
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
            <p style={{ display: type === "politician" ? "block" : "none" }}>Areas of influence: {renderAreasOfInfluence()}</p>
            <EditAccount />
            <ServicesSnippet />
        </div>
    )
}
