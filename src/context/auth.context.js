import {createContext, useState, useEffect} from "react"
import axios from "axios"

export const AuthContext = createContext()

export function AuthProviderWrapper(props){
    const initialUserState = {
        username: "",
        password: "",
        email: "",
        type: "",
        organization: "",
        position: "",
        party: "",
        areasOfInfluence: []
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(initialUserState)

    const storeToken = token => {
        localStorage.setItem("authToken", token)
    }

    const authenticateUser = () => {
        const storedToken = localStorage.getItem("authToken")
        if (storedToken){
            axios.get(`${process.env.REACT_APP_URL}/auth/verify`,
            {headers: {Authorization: `Bearer ${storedToken}`}}
            ).then(res => {
                const userData = res.data
                setIsLoggedIn(true)
                setIsLoading(false)
                setUser(userData)
            }).catch(err => {
                setIsLoggedIn(false)
                setIsLoading(false)
                setUser(initialUserState)
            })
        } else {
            setIsLoggedIn(false)
            setIsLoading(false)
            setUser(initialUserState)
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken")
    }

    const logOutUser = () => {
        removeToken()
        authenticateUser()
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{isLoggedIn, isLoading, user, setUser, storeToken, authenticateUser, logOutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}
