import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { KeywordsList } from "./KeywordsList";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Signup(props) {
    const { type } = useParams();
    const navigate = useNavigate();
    const { user, storeToken, authenticateUser, setUser } = useContext(AuthContext);
    const authToken = localStorage.getItem("authToken")

    const [formData, setFormData] = useState(user);
    const [errorMessage, setErrorMessage] = useState("");

    const { _id, username, email, password, position, party, organization, areasOfInfluence } = formData
    let userData
    if (type === "lobbyist") {
        userData = { username, email, password, type, organization }
    } else {
        userData = { username, email, password, type, position, party, areasOfInfluence }
    }

    const handleInputChange = (target, category) => {
        setFormData(prevUser => {
            return { ...prevUser, [category]: target.value }
        })
    }

    const submitSignup = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/auth/signup`, userData)
            .then((response) => {
                storeToken(response.data.authToken)
                authenticateUser()
            })
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    }

    const submitUpdate = (event) => {
        event.preventDefault()
        axios.put(`${process.env.REACT_APP_URL}/auth/user/${_id}`, userData, {headers: {Authorization: `Bearer ${authToken}`}})
            .then(({data}) => {
                setUser(data)
                setFormData(data)
                navigate('/')
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <div className="page">
            <div className="overlay-hero"></div>
            <div className="hero"></div>
            <div className="inner-hero down">
                <h2>{_id ? "Edit your user data" : "Signup"}</h2>
                <form onSubmit={_id ? submitUpdate : submitSignup}>
                    <div className="inputContainer">
                        <label>Username: <input
                            type="text"
                            value={username}
                            onChange={({ target }) => handleInputChange(target, "username")}
                            autoComplete="username"
                            required
                        /></label>
                    </div>
                    <div className="inputContainer">
                        <label>Email: <input
                            type="email"
                            value={email}
                            onChange={({ target }) => handleInputChange(target, "email")}
                            required
                        /></label>
                    </div>
                    <div className="inputContainer">
                        <label>Password: <input
                            type="password"
                            value={password}
                            onChange={({ target }) => handleInputChange(target, "password")}
                            autoComplete={_id ? "current-password" : "new-password"}
                            required
                        /></label>
                    </div>
                    <div className="inputContainer" style={{ display: type === "lobbyist" ? "block" : "none" }}>
                        <label>Organization: <input
                            type="text"
                            value={organization}
                            onChange={({ target }) => handleInputChange(target, "organization")}
                        /></label>
                    </div>
                    <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                        <label>Position: <input
                            type="text"
                            value={position}
                            onChange={({ target }) => handleInputChange(target, "position")}
                        /></label>
                    </div>
                    <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                        <label>Party: <input
                            type="text"
                            value={party}
                            onChange={({ target }) => handleInputChange(target, "party")}
                        /></label>
                    </div>
                    <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                        {type === "politician" && areasOfInfluence.length > 0 &&
                        <KeywordsList areasOfInfluence={areasOfInfluence} setFormData={setFormData} />}
                    </div>
                    <div className="link end-buttons">
                        <button className="auth">{_id ? "Edit" : "Signup!"}</button>
                        <NavLink to="/">
                            <button type="button">Back</button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
