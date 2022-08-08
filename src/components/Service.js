import { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export function Service(props) {
    const { renderAreasOfInfluence } = props
    const { serviceId } = useParams()
    const { user } = useContext(AuthContext)
    const { type } = user

    const [service, setService] = useState(null)
    const [matchingPoliticians, setMatchingPoliticians] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/services/${serviceId}`)
            .then(res => {
                setService(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading service from DB:", err);
            })
    }, [])

    useEffect(() => {
        if (!service) return;
        axios.post(`${process.env.REACT_APP_URL}/services/politicians`, { areasOfInfluence: service.areasOfInfluence })
            .then(res => {
                setMatchingPoliticians(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading politicians matching service:", err);
            })
    }, [service])

    const renderPoliticians = politicians => {
        return politicians?.map(politician => (
            <article key={politician._id}>
                <p>Name: {politician.username}</p>
                <p>Email: {politician.email}</p>
                <p>Position: {politician.position}</p>
                <p>Party: {politician.party}</p>
                {politician && renderAreasOfInfluence("politician", politician.areasOfInfluence)}
            </article>
        ))
    }

    const renderService = () => {
        if (!service) return <p>Loading service...</p>
        if (!matchingPoliticians || matchingPoliticians.length === 0) return <p>Loading politicians matching your request...</p>
        return (
            <div>
                <h3>{service.title}</h3>
                <div style={{ display: type === "politician" ? "block" : "none" }}>
                    <p>Requested by: {service.lobbyist.username}</p>
                    <p>Organization: {service.lobbyist.organization}</p>
                </div>
                {renderAreasOfInfluence("politician", service.areasOfInfluence)}
                <p>Financial benefit: {service.financialOffer} $</p>
                <p>Other benefits: {service.otherOffers}</p>
                <div style={{ display: type === "lobbyist" ? "block" : "none" }}>
                    {service.politicians.length === 0
                        ? <p>So far no politician has accepted your offer.</p>
                        :   <div>
                                <p>These politicians have accepted your offer:</p>
                                {renderPoliticians(service.politicians)}
                            </div>}
                </div>
                <div style={{ display: type === "lobbyist" ? "block" : "none" }}>
                    <p>Politicians matching your request:</p>
                    {renderPoliticians(matchingPoliticians)}
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderService()}
            <NavLink to="/services">
                <button>Back</button>
            </NavLink>
        </div>
    )
}
