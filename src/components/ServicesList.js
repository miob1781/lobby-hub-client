import {useState, useEffect, useContext} from "react";
import {NavLink, useParams} from "react-router-dom";
import {AuthContext} from "../context/auth.context";
import {CreateService} from "./CreateService";
import axios from "axios";

export function ServicesList(props){
    const {renderAreasOfInfluence} = props
    const {user} = useContext(AuthContext)
    const {_id, email, username, type, organization, position, party, areasOfInfluence} = user
    const [services, setServices] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/services/${type}/${_id}`)
            .then(res => {
                console.log("services returned from DB:", res.data)
                setServices(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading services:", err);
            })
    }, [])

    useEffect(serviceId => {
        axios.get(`${process.env.REACT_APP_URL}/services/politicians/?areasOfInfluence=${areasOfInfluence}`)
            .then(res => {
                console.log("service returned from DB:", res.data)
                setServices(prevServices => {
                    const copy = [...prevServices]
                    const service = copy.find(serviceId)
                    service.politiciansMatching = res.data
                    return copy
                })
            })
            .catch(err => {
                console.log("An error has occurred while loading politicians matching service:", err);
            })
    }, [])

    const renderServices = () => {
        if (!services){
            return <p>Loading...</p>
        } else {
            return services?.map(service => (
                <div key={service._id}>
                    <h3>Title: {service.title}</h3>
                    <p style={{display: type === "politician" ? "block" : "none"}}>Requested by: {service.lobbyist}</p>
                    <p>Areas of influence: {renderAreasOfInfluence("politician", service.areasOfInfluence)}</p>
                    <p>Financial offer: {service.financialOffer} $</p>
                    <p>Other offers: {service.otherOffers}</p>
                    <div style={{display: type === "lobbyist" && service.politicians.length > 0 ? "block" : "none"}}>
                        <p>Politicians that have accepted your request:</p>
                        {service.politicians?.map(politician => (
                            <article key={politician._id}>
                                <p>Name: {politician.username}</p>
                                <p>Email: {politician.email}</p>
                                <p>Position: {politician.position}</p>
                                <p>Party: {politician.party}</p>
                                {renderAreasOfInfluence("politician", politician.areasOfInfluence)}
                            </article>
                        ))}
                    </div>
                </div>
            ))
        }
    }

    return (
        <div>
            <h2>List of Services</h2>
            {renderServices()}
        </div>
    )
}
