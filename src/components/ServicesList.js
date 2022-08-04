import {useState, useEffect, useContext} from "react";
import {NavLink, useParams} from "react-router-dom";
import {CreateService} from "./CreateService";

export function ServicesList(props){
    return (
        <div>
            <h2>List of Services</h2>
            <CreateService />
        </div>
    )
}
