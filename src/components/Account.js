import {useState, useEffect, useContext} from "react";
import {NavLink, useParams} from "react-router-dom";
import { EditAccount } from "./EditAccount";
import {ServicesSnippet} from "./ServicesSnippet";

export function Account(props){
    const {user, setUser} = props

    return (
        <div>
            <h2>Account</h2>
            <EditAccount />
            <ServicesSnippet />
        </div>
    )
}
