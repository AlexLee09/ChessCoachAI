import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import React, { useEffect } from 'react'; 

function App() {
  useEffect(() => 
  {
    const checkLogin = async() => 
    {
      const response = await fetch ("/user/get"); 
      const data = await response.json();

      console.log (data); 
    }

    checkLogin(); 
  }, []); 

  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

      </Routes>
    </Router>

  );
}

export default App;
