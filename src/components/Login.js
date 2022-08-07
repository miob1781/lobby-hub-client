import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const {storeToken, authenticateUser} = useContext(AuthContext)

    const handleUsername = ({target}) => setUsername(target.value);
    const handlePassword = ({target}) => setPassword(target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };

        axios.post(`${process.env.REACT_APP_URL}/auth/login`, requestBody)
            .then((response) => {
                console.log('JWT token:', response.data.authToken);
                storeToken(response.data.authToken)
                authenticateUser()
                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="LoginPage">
            <h1>Login</h1>

            <form onSubmit={handleLoginSubmit}>
                <label>Username: </label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    autoComplete="username"
                    onChange={handleUsername}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={handlePassword}
                />

                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Don't have an account yet?</p>
            <div>
                <NavLink to="/signup/lobbyist">
                    <button>Register as lobbyist.</button>
                </NavLink>
            </div>
            <div>
                <NavLink to="/signup/politician">
                    <button>Register as politician.</button>
                </NavLink>
            </div>
        </div>
    )
}
