import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleUsername = ({ target }) => setUsername(target.value);
    const handlePassword = ({ target }) => setPassword(target.value);

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
        <div className="page">
            <div className="hero"></div>
            <div className="overlay-hero"></div>
            <div className="inner-hero">
                <h2>Login</h2>
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
                    <div className="link end-buttons">
                        <button type="submit" className="auth">Login</button>
                    </div>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <p>Don't have an account yet?</p>
                <div className="link end-buttons">
                    <NavLink to="/signup/lobbyist">
                        <button className="auth">Register as lobbyist</button>
                    </NavLink>
                    <NavLink to="/signup/politician">
                        <button className="auth">Register as politician</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
