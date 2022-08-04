import {useState, useEffect, useContext} from "react";
import {NavLink, useParams} from "react-router-dom";

export function Home(props){
    return (
        <div>
            <h1>Welcome to LobbyHub!</h1>
            <div>
                <p>I want to buy political services.</p>
                <NavLink to="/signup/lobbyist">
                    <button>Register as lobbyist.</button>
                </NavLink>
            </div>
            <div>
                <p>I want to sell political services.</p>
                <NavLink to="/signup/politician">
                    <button>Register as politician.</button>
                </NavLink>
            </div>
        </div>
    )
}
