import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { KeywordsList } from "./KeywordsList";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Signup(props) {
    const { type } = useParams()
    const navigate = useNavigate();
    const { user, setUser, storeToken, authenticateUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleInputChange = (target, category) => {
        setUser(prevUser => {
            return {...prevUser, [category]: target.value}
        })
    }

    const submitSignup = (event) => {
        event.preventDefault()
        const {username, email, password, position, party, areasOfInfluence, organization} = user
        let userData
        if (type === "lobbyist"){
            userData = {username, email, password, type, organization}
        } else {
            userData = {username, email, password, type, position, party, areasOfInfluence}

        }
        console.log("submitted user data for signup:", user);
        axios.post(`${process.env.REACT_APP_URL}/auth/signup`, userData)
            .then((res) => {
                storeToken(res.data.authToken)
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

return (
    <div>
        <h2>Signup</h2>
        <form onSubmit={submitSignup}>
            <div className="inputContainer">
                <label>Username: <input
                    type="text"
                    value={user.username}
                    onChange={({target}) => handleInputChange(target, "username")}
                    required
                /></label>
            </div>
            <div className="inputContainer">
                <label>Email: <input
                    type="email"
                    value={user.email}
                    onChange={({target}) => handleInputChange(target, "email")}
                    required
                /></label>
            </div>
            <div className="inputContainer">
                <label>Password: <input
                    type="password"
                    value={user.password}
                    onChange={({target}) => handleInputChange(target, "password")}
                    required
                /></label>
            </div>
            <div className="inputContainer" style={{ display: type === "lobbyist" ? "block" : "none" }}>
                <label>Organization: <input
                    type="text"
                    value={user.organization}
                    onChange={({ target }) => handleInputChange(target, "organization")}
                /></label>
            </div>
            <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                <label>Position: <input
                    type="text"
                    value={user.position}
                    onChange={({ target }) => handleInputChange(target, "position")}
                /></label>
            </div>
            <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                <label>Party: <input
                    type="text"
                    value={user.party}
                    onChange={({ target }) => handleInputChange(target, "party")}
                /></label>
            </div>
            <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                <KeywordsList setArray={setUser} />
            </div>
            <button>Signup!</button>
        </form>
        <NavLink to="/">
            <button type="button">Back</button>
        </NavLink>
    </div>
)
}
