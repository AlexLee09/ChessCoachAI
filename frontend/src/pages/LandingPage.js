import React from 'react'; 
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Landing Page</h1>
            <button onClick = {toLoginPage}>Login</button>
            <button onClick = {toDashboardPage}>Dashboard</button>
        </div>

    );

}





export default LandingPage;