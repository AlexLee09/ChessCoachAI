import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import classes from './DashboardPage.module.css';

function DashboardPage () 
{
    const navigate = useNavigate();

    const [games, setGames] = useState({});

    const toLoginPage = () => 
    {
        navigate("/login")
    }

    const getDashboardData = async () => {
        const response = await fetch("http://localhost:3001/dashboard/getAllGames"); 
        const data = await response.json();

        if (data.status === "ERROR") {
            alert(data.message);
            return;
        }

        setGames(data.games); 
    }

    useEffect(() => 
    {
        getDashboardData(); 
    }, []); 

    return (
        <div className = {classes.container}>
            <h1 className = {classes.yourGamesText}>Your Games</h1>
            <div className = {classes.grid}>
                { Object.keys(games).length > 0 && games.map((game, index) => <div className = {classes.history}>
                    <h2>{game.name}</h2>
                    {/* <p>{game.date}</p>
                    { game.tags.map((tag, index) => <p key={index}>{tag}</p>)} */}
                    <h3>{game.date}</h3>
            </div>) }
            </div>
        </div>

    );



}





export default DashboardPage;