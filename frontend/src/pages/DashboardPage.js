import React from 'react'; 
import { useNavigate } from 'react-router-dom';

function DashboardPage () 
{
    const navigate = useNavigate();

    const toLoginPage = () => 
    {
        navigate("/login")
    }

    return (
        <div>
            <h1>Dashboard Page</h1>
        </div>

    );

}





export default DashboardPage;