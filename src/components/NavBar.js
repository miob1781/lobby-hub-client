import {useState, useEffect, useContext} from "react";
import {NavLink, useParams} from "react-router-dom";

export function NavBar(props){
    const {user} = props
    return (
        <nav>
            <NavLink to="/account">
                <button>Account</button>
            </NavLink>
            <NavLink to="/services">
                <button>Services</button>
            </NavLink>
            <NavLink to="/our-mission">
                <button>Our Mission</button>
            </NavLink>
            <NavLink to="/signup">
                <button>Signup</button>
            </NavLink>
            <NavLink to="/login">
                <button>Login</button>
            </NavLink>
        </nav>
    )
}
