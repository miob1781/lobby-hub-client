import {useState, useEffect, useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/auth.context";
import axios from "axios";

export function ServicesList(props){
    const {user} = useContext(AuthContext)
    const {type, areasOfInfluence} = user
    const authToken = localStorage.getItem("authToken")
    
    const [agreedServices, setAgreedServices] = useState(null)
    const [matchingServices, setMatchingServices] = useState(null)
    const [typeOfServices, setTypeOfServices] = useState("agreed")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/services/${user?.type}/${user?._id}`, { headers: {Authorization: `Bearer ${authToken}`}})
            .then(res => {
                setAgreedServices(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading services:", err);
            })
    }, [])

    useEffect(() => {
        if (type === "politician"){
            axios.post(`${process.env.REACT_APP_URL}/services/services-matching-keywords`, { areasOfInfluence }, { headers: {Authorization: `Bearer ${authToken}`}})
            .then(response => {
                setMatchingServices(response.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading services matching keywords:", err)
            })
        }
    }, [])

    const renderServices = () => {
        const services = typeOfServices === "agreed" ? agreedServices : matchingServices
        if (!services){
            return <p>Loading services...</p>
        }
        if (services.length === 0 && typeOfServices === "agreed"){
            return <p>You have not {type === "lobbyist" ? "offered" : "agreed to"} any services yet.</p>
        } 
        if (services.length === 0 && typeOfServices === "matching"){
            return <p>There are no offers matching your areas of influence at the moment.</p>
        } 
        return services?.map(service => (
            <div key={service._id} className="card">
                <h3>{service.title}</h3>
                <p>Financial benefits: {service.financialOffer} $</p>
                <p>Other benefits: {service.otherOffers}</p>
                <NavLink to={`/services/${service._id}`} className="link end-buttons"><button className="details">Show Details</button></NavLink>
            </div>
        ))
    }

    return (
        <div>
            <h2>Services</h2>
            <NavLink to="/services/form/create" style={{display: type === "lobbyist" ? "block" : "none"}} className="link end-buttons"><button>New Service</button></NavLink>
            <div style={{display: type === "politician" ? "block" : "none"}} className="link end-buttons">
                <button type="button" onClick={() => setTypeOfServices("matching")}>Services matching your keywords</button>
                <button type="button" onClick={() => setTypeOfServices("agreed")}>Services you agreed on</button>
            </div>
            <div className="card-container">
                {renderServices()}
            </div>
        </div>
    )
}
