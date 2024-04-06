import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import classes from './Navbar.module.css';
import logo from '../assets/logo.svg'; 
import chessCoachAI_Logo from '../assets/ChessCoachAI_Logo.png';
import knightLogo from '../assets/Knight-Logo.png'

function Navbar ()
{
    const navigate = useNavigate();

    const toLoginPage = () => 
    {
        navigate("/login")

    }

    const toLandingPage = () => 
    {
        navigate("/")
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.leftNav}>
                <img className = {classes.logo} src={knightLogo} />
                <h1 className = {classes.logoText} onClick = {toLandingPage}>Chess Coach AI</h1>
            </div>
            <div className = {classes.rightNav}>
                <h1 className = {classes.contactUs}>Contact Us</h1>
                <button onClick = {toLoginPage} className = {classes.loginSignup}>Login</button>
            </div>
        </div>
    )

}



export default Navbar;