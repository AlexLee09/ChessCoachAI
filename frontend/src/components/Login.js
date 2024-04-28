import classes from './Login.module.css'
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../store/UserContext';

function Login() {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext); 
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const handleLogin = async (event) => {
        event.preventDefault();

        const dataToSend = {
            username: username,
            password: password
        }

        
        const response = await fetch("/user/login",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        })
        
        const data = await response.json();
        
        console.log(data);

        if (data.status === "ERROR")
        {
            alert (data.message); 
            return; 
        }

        alert ("User logged in successfully"); 

        navigate ("/dashboard")

        setUser(data.user);
    }
    



    return (
        <div>
            <h1 className={classes.title}>AI-powered chess analysis</h1>
            <div className={classes.container}>
                <div>
                    <form className={classes.login} onSubmit={(event) => handleLogin(event)}>
                        <h1 className={classes.title}>Login</h1>          
                        <input
                            className={classes.username}
                            type="text"
                            placeholder='Username'
                            onChange={(event) => setUsername(event.target.value)}>
                        </input>
                        <input
                            className={classes.password}
                            type="password"
                            placeholder='Password'
                            onChange={(event) => setPassword(event.target.value)}>
                        </input>
                        <div className={classes.buttons}>
                            <input type="submit" value="Login" className={classes.loginButton}></input>
                        </div>
                    </form>
                </div>
    
            </div>
       </div>

              


    );


}





export default Login;