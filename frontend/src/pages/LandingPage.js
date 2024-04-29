import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import classes from './LandingPage.module.css';
import rightSideImage from '../assets/RightSideImage.png'

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
                <div className = {classes.leftText}>
                    <h1 className = {classes.title}>Think Like A Grandmaster!</h1>
                    <h2 className = {classes.subheading}>Responses In Seconds!</h2>
                </div>
                <div className = {classes.infoButtons}>
                    <button className = {classes.infoButton}>About Us</button>
                    <button className = {classes.infoButton}>Learn More</button>
                </div>
            </div>
            <div className = {classes.rightContainer}>
                <img className = {classes.rightImage} src = {rightSideImage}></img>


            </div>
            
        </div>

    );

}





export default LandingPage;