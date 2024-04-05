import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import classes from './LandingPage.module.css';

function LandingPage () 
{
    const navigate = useNavigate();

    const toLoginPage = () => 
    {
        navigate("/login")

    }
     
    const toDashboardPage = () => 
    {
        navigate("/dashboard")
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.leftContainer}>
                <h1 className = {classes.title}>Think Like A Grandmaster!</h1>
                <h2 className = {classes.subheading}>Responses In Seconds!</h2>
                <div className = {classes.infoButtons}>
                    <button className = {classes.infoButton}>About Us</button>
                    <button className = {classes.infoButton}>Learn More</button>
                </div>
            </div>
            <div className = {classes.rightContainer}>
                <h1>Right Side</h1>

            </div>
            
        </div>

    );

}





export default LandingPage;