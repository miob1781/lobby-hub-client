import './App.css';
import {useContext} from "react";
import {Routes, Route} from "react-router-dom";
import { NavBar } from './components/NavBar';
import { Account } from './components/Account';
import { Home } from './components/Home';
import {Signup} from './components/Signup';
import {Login} from './components/Login';
import { OurMission } from './components/OurMission';
import { ServicesList } from './components/ServicesList';
import { IsAnon } from './components/IsAnon';
import { IsPrivate } from './components/IsPrivate';
import { AuthContext } from './context/auth.context';

function App() {
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Account /> : <Home />} />
                <Route path="/signup/:type" element={<IsAnon><Signup /></IsAnon>} />
                <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
                <Route path="/services" element={<IsPrivate><ServicesList /></IsPrivate>} />
                <Route path="/our-mission" element={<OurMission />} />
            </Routes>
        </div>
    );
}

export default App;
