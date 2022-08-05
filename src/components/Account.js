import { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { EditAccount } from "./EditAccount";
import { ServicesSnippet } from "./ServicesSnippet";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Account(props) {
    const { user, setUser } = useContext(AuthContext)
    console.log("User in <Account />:", user);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/auth/user/${user._id}`)
            .then(res => {
                setUser(res.data)
            })
    }, [])

    return (
        <div>
            <h2>Account</h2>
            <p>User: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>You are a {user.type}.</p>
            <p style={{ display: user.type === "lobbyist" ? "block" : "none" }}>Organization: {user.organization || "none"}</p>
            <p style={{ display: user.type === "politician" ? "block" : "none" }}>Position: {user.position || "none"}</p>
            <p style={{ display: user.type === "politician" ? "block" : "none" }}>Party: {user.party || "none"}</p>
            <p style={{ display: user.type === "politician" ? "block" : "none" }}>{user.areasOfInfluence}</p>
            <EditAccount />
            <ServicesSnippet />
        </div>
    )
}
