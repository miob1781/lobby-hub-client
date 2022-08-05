import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { KeywordsList } from "./KeywordsList";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Signup(props) {
    const { type } = useParams()
    const navigate = useNavigate();
    const { setUser, storeToken, authenticateUser } = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [organization, setOrganization] = useState("")
    const [position, setPosition] = useState("")
    const [party, setParty] = useState("")
    const [areasOfInfluence, setAreasOfInfluence] = useState([])
    const [errorMessage, setErrorMessage] = useState(undefined);

    const userData = {
        username,
        email,
        password,
        type,
        organization,
        position,
        party,
        areasOfInfluence
    }

    const submitSignup = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/auth/signup`, userData)
            .then((res) => {
                console.log('JWT token:', res.data.authToken);
                storeToken(res.data.authToken)
                authenticateUser()
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
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    required
                /></label>
            </div>
            <div className="inputContainer">
                <label>Email: <input
                    type="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    required
                /></label>
            </div>
            <div className="inputContainer">
                <label>Password: <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    required
                /></label>
            </div>
            <div className="inputContainer" style={{ display: type === "lobbyist" ? "block" : "none" }}>
                <label>Organization: <input
                    type="text"
                    value={organization}
                    onChange={({ target }) => setOrganization(target.value)}
                /></label>
            </div>
            <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                <label>Position: <input
                    type="text"
                    value={position}
                    onChange={({ target }) => setPosition(target.value)}
                /></label>
            </div>
            <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                <label>Party: <input
                    type="text"
                    value={party}
                    onChange={({ target }) => setParty(target.value)}
                /></label>
            </div>
            <div className="inputContainer" style={{ display: type === "politician" ? "block" : "none" }}>
                <KeywordsList setAreasOfInfluence={setAreasOfInfluence} />
            </div>
            <button>Signup!</button>
        </form>
        <NavLink to="/">
            <button type="button">Back</button>
        </NavLink>
    </div>
)
}
