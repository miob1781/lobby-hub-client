import {useState, useEffect, useContext} from "react";
import {NavLink, useParams} from "react-router-dom";
import {AuthContext} from "../context/auth.context";

export function NavBar(props){
    const {logOutUser, isLoggedIn} = useContext(AuthContext)
    return (
        <nav>
            <NavLink className="link" to="/">
                <button>Home</button>
            </NavLink>
            <NavLink className="link" to="/services" style={{display: isLoggedIn ? "block" : "none"}}>
                <button>Services</button>
            </NavLink>
            <NavLink className="link" to="/our-mission">
                <button>Our Mission</button>
            </NavLink>
            {isLoggedIn ? 
            <form className="link">
                <button type="button" onClick={logOutUser}>Logout</button>
            </form> :
            <NavLink className="link" to="/login">
                <button>Login</button>
            </NavLink>}
        </nav>
    )
}
