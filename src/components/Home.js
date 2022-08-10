import { NavLink } from "react-router-dom";

export function Home(props) {
    return (
        <div className="page">
            <div className="overlay-hero"></div>
            <div className="hero"></div>
            <div className="outer-container">
                <div className="title-container">
                    <h1>Welcome to LobbyHub!</h1>
                </div>
                <div className="inner-container">
                    <div className="element-container">
                        <p>I want to buy political services.</p>
                        <NavLink to="/signup/lobbyist" className="link">
                            <button>Register as lobbyist</button>
                        </NavLink>
                    </div>
                    <div className="element-container">
                        <p>I want to sell political services.</p>
                        <NavLink to="/signup/politician" className="link">
                            <button>Register as politician</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
