import { useContext } from "react";
import { Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/auth.context";

export function NavBar() {
    const { logOutUser, isLoggedIn } = useContext(AuthContext)
    return (
        <Nav className="justify-content-center">
            <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/services" style={{ display: isLoggedIn ? "block" : "none" }}>
                <Nav.Link>Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/our-mission">
                <Nav.Link>Our Mission</Nav.Link>
            </LinkContainer>
            {isLoggedIn
                ? <form className="mb-3">
                    <Button type="button" onClick={logOutUser}>Logout</Button>
                </form>
                : <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>}
        </Nav>
    )
}
