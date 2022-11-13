import './App.css';
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar';
import { Account } from './components/Account';
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { OurMission } from './components/OurMission';
import { ServicesList } from './components/ServicesList';
import { Service } from './components/Service';
import { CreateService } from './components/CreateService';
import { IsAnon } from './components/IsAnon';
import { IsPrivate } from './components/IsPrivate';
import { AuthContext } from './context/auth.context';

function App() {
    const { isLoggedIn } = useContext(AuthContext)

    const renderAreasOfInfluence = (type, areasOfInfluence) => {
        if (type !== "politician") return;
        let content = areasOfInfluence.reduce((acc, val) => {
            return acc += val + ", "
        }, "")
        content = content.slice(0, -2)
        return <p>Areas of influence: {content}</p>
    }

    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Account renderAreasOfInfluence={renderAreasOfInfluence} /> : <Home />} />
                <Route path="/signup/:type" element={<IsAnon><Signup /></IsAnon>} />
                <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
                <Route path="/edit/:type" element={<IsPrivate><Signup /></IsPrivate>} />
                <Route path="/services" element={<IsPrivate><ServicesList renderAreasOfInfluence={renderAreasOfInfluence} /></IsPrivate>} />
                <Route path="/services/form/:createOrId" element={<IsPrivate><CreateService /></IsPrivate>} />
                <Route path="/services/:serviceId" element={<IsPrivate><Service renderAreasOfInfluence={renderAreasOfInfluence} /></IsPrivate>} />
                <Route path="/our-mission" element={<OurMission />} />
            </Routes>
        </div>
    );
}

export default App;
