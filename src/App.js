import './App.css';
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import { NavBar } from './components/NavBar';
import { Account } from './components/Account';
import { Home } from './components/Home';
import {Signup} from './components/Signup';
import {Login} from './components/Login';
import { OurMission } from './components/OurMission';
import { ServicesList } from './components/ServicesList';


function App() {
    const [user, setUser] = useState(null);

    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup/:type" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account user={user} setUser={setUser} />} />
                <Route path="/services" element={<ServicesList user={user} />} />
                <Route path="/our-mission" element={<OurMission />} />
            </Routes>
        </div>
    );
}

export default App;
