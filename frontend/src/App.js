import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';
import Navbar from './components/Navbar';
import React, { useEffect, useState, useMemo } from 'react';
import {Chessboard} from "react-chessboard"

import UserContext from './store/UserContext';

function App() 
{
    const [user, setUser] = useState(null); 
    const userContextValue = useMemo (
        () => ({ user, setUser }),
        [user, setUser]
    )

    useEffect(() => {
        const checkLogin = async () => {
            const response = await fetch("/user/get");
            const data = await response.json();

            if (data.status === "ERROR")
                return; 

            setUser(data.user); 

            console.log (data.user)
        }

        checkLogin();
    }, []);

    if (!user)
    {
        return <UserContext.Provider value={userContextValue}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<LandingPage />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    }

    return (
        <UserContext.Provider value={userContextValue}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path = "/analysis" element = {<AnalysisPage/>} />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
