import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export function Service(props) {
    const { renderAreasOfInfluence } = props
    const { serviceId } = useParams()
    const { user } = useContext(AuthContext)
    const { type } = user
    const navigate = useNavigate()
    const authToken = localStorage.getItem("authToken")

    const [service, setService] = useState(null)
    const [matchingPoliticians, setMatchingPoliticians] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/services/${serviceId}`, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(res => {
                setService(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading service from DB:", err);
            })
    }, [])

    useEffect(() => {
        if (!service) return;
        axios.post(`${process.env.REACT_APP_URL}/services/politicians`, { areasOfInfluence: service.areasOfInfluence }, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(res => {
                setMatchingPoliticians(res.data)
            })
            .catch(err => {
                console.log("An error has occurred while loading politicians matching service:", err);
            })
    }, [service])

    const deleteService = (event) => {
        axios.delete(`${process.env.REACT_APP_URL}/services/${serviceId}`, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(() => {
                navigate("/services")
            })
            .catch(err => {
                console.log("An error has occurred while deleting a service:", err)
            })
    }

    const acceptOffer = () => {
        axios.put(`${process.env.REACT_APP_URL}/services/${serviceId}/accept-offer`, { politician: user._id }, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(response => {
                console.log("service after accepting offer:", response.data)
                setService(response.data)
            })
            .catch(err => {
                console.log("An error has occurred while accepting an offer:", err)
            })
    }

    const renderPoliticians = politicians => {
        return politicians?.map(politician => (
            <article key={politician?._id} className="card">
                <p>Name: {politician?.username}</p>
                <p>Email: {politician?.email}</p>
                <p>Position: {politician?.position}</p>
                <p>Party: {politician?.party}</p>
                {politician && renderAreasOfInfluence("politician", politician?.areasOfInfluence)}
            </article>
        ))
    }

    const renderService = () => {
        if (!service) return <p>Loading service...</p>
        if (!matchingPoliticians || matchingPoliticians.length === 0) return <p>Loading politicians matching your request...</p>
        return (
            <div>
                <h3>{service.title}</h3>
                <p style={{ display: type === "politician" && service?.politicians.find(pol => pol._id === user._id) ? "block" : "none" }}>You have accepted this offer.</p>
                <p>Description: {service.description}</p>
                <div style={{ display: type === "politician" ? "block" : "none" }}>
                    <p>Requested by: {service?.lobbyist?.username}</p>
                    <p>Organization: {service?.lobbyist?.organization}</p>
                </div>
                {renderAreasOfInfluence("politician", service?.areasOfInfluence)}
                <p>Financial benefit: {service?.financialOffer} $</p>
                <p>Other benefits: {service?.otherOffers}</p>
                <div style={{ display: type === "lobbyist" ? "block" : "none" }}>
                    {service.politicians.length === 0
                        ? <p>So far no politician has accepted your offer.</p>
                        : <div>
                            <p>These politicians have accepted your offer:</p>
                            <div className="card-container">
                                {renderPoliticians(service?.politicians)}
                            </div>
                        </div>}
                </div>
                <div style={{ display: type === "lobbyist" ? "block" : "none" }}>
                    <p>Politicians matching your request:</p>
                    <div className="card-container">
                        {renderPoliticians(matchingPoliticians)}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderService()}
            <form style={{ display: type === "politician" && !service?.politicians.find(pol => pol._id === user._id) ? "block" : "none" }} className="link end-buttons">
                <button type="button" onClick={acceptOffer}>Accept Offer</button>
            </form>
            <form style={{ display: type === "lobbyist" ? "block" : "none" }} className="link end-buttons">
                <button type="button" onClick={deleteService}>Delete Service</button>
            </form>
            <NavLink to={`/services/form/${serviceId}`} style={{ display: type === "lobbyist" ? "block" : "none" }} className="link end-buttons">
                <button>Edit</button>
            </NavLink>
            <NavLink to="/services" className="link end-buttons">
                <button>Back</button>
            </NavLink>
        </div>
    )
}
