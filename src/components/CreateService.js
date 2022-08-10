import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { KeywordsList } from "./KeywordsList";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function CreateService(props) {
    const { createOrId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const authToken = localStorage.getItem("authToken")

    const initialFormData = {
        title: "",
        description: "",
        financialOffer: 0,
        otherOffers: ""
    }

    const [formData, setFormData] = useState(initialFormData);
    const [areasOfInfluence, setAreasOfInfluence] = useState([])
    const [errorMessage, setErrorMessage] = useState("");

    const { title, description, financialOffer, otherOffers } = formData

    const handleInputChange = (target, category) => {
        setFormData(prevService => {
            return { ...prevService, [category]: target.value }
        })
    }

    const descriptionData = { title, description, financialOffer, otherOffers, areasOfInfluence, lobbyist: user._id }

    useEffect(() => {
        if (createOrId !== "create") {
            axios.get(`${process.env.REACT_APP_URL}/services/${createOrId}`, { headers: {Authorization: `Bearer ${authToken}`}})
                .then(response => {
                    setFormData(response.data)
                })
                .catch(err => {
                    console.log("An error has occurred while loading service:", err)
                })
        }
    }, [])

    const createService = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/services`, descriptionData, { headers: {Authorization: `Bearer ${authToken}`}})
            .then((res) => {
                setFormData(initialFormData)
                navigate("/services")
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    }

    const updateService = (event) => {
        event.preventDefault()
        axios.put(`${process.env.REACT_APP_URL}/services/${createOrId}`, descriptionData, { headers: {Authorization: `Bearer ${authToken}`}})
            .then(() => {
                setFormData(initialFormData)
                navigate('/services')
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <div>
            <h2>{createOrId !== "create" ? "Edit" : "Create"} Service</h2>
            <form onSubmit={createOrId !== "create" ? updateService : createService}>
                <div className="inputContainer">
                    <label>Title: <input
                        type="text"
                        value={title}
                        onChange={({ target }) => handleInputChange(target, "title")}
                        required
                    /></label>
                </div>
                <div className="inputContainer">
                    <label>Description: <textarea
                        rows="5"
                        cols="20"
                        value={description}
                        onChange={({ target }) => handleInputChange(target, "description")}
                        required
                    /></label>
                </div>
                <div className="inputContainer">
                    <label>Financial Benefits: <input
                        type="number"
                        value={financialOffer}
                        onChange={({ target }) => handleInputChange(target, "financialOffer")}
                        required
                    /></label>
                </div>
                <div className="inputContainer">
                    <label>Other benefits: <input
                        type="text"
                        value={otherOffers}
                        onChange={({ target }) => handleInputChange(target, "otherOffers")}
                    /></label>
                </div>
                <div className="inputContainer">
                    <KeywordsList setAreasOfInfluence={setAreasOfInfluence} />
                </div>
                <button>{createOrId !== "create" ? "Edit" : "Create"}</button>
            </form>
            <NavLink to="/">
                <button type="button">Back</button>
            </NavLink>
        </div>
    )
}
