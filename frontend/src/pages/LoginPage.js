import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './LoginPage.module.css';
import UserContext from '../store/UserContext';

function LoginPage() {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext); 
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [newEmail, setNewEmail] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newConfirmPassword, setNewConfirmPassword] = useState("")


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
    
    const handleSignup = async (event) => {
        event.preventDefault();

        if (newPassword != newConfirmPassword){
            alert ("Passwords do not match");
            return;
        }

        if (newEmail === "" || newUsername === "" || newPassword === "" || newConfirmPassword === "")
        {
            alert ("All fields required");  
            return; 
        }

        const newDataToSend = {
            email: newEmail,
            username: newUsername,
            password: newPassword
        }

        const responseSignup = await fetch("/user/new",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newDataToSend)
        })

        const dataSignup = await responseSignup.json();

        console.log(dataSignup);

        if (dataSignup.status === "ERROR")
        {
            alert (dataSignup.message); 
            return; 
        }

        // alert ("User signed up successfully"); 

        navigate ("/dashboard")

        setUser(dataSignup.user); 
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
                <div>
                    <form className={classes.signup} onSubmit={(event) => handleSignup(event)}>
                        <h1 className={classes.title}>Sign Up</h1>          
                        <input
                            className={classes.email}
                            type="email"
                            placeholder='Email'
                            onChange={(event) => setNewEmail(event.target.value)}>
                        </input>
                        <input
                            className={classes.username}
                            type="text"
                            placeholder='Username'
                            onChange={(event) => setNewUsername(event.target.value)}>
                        </input>
                        <input
                            className={classes.password}
                            type="password"
                            placeholder='Password'
                            onChange={(event) => setNewPassword(event.target.value)}>
                        </input>
                        <input
                            className={classes.password}
                            type="password"
                            placeholder='Confirm Password'
                            onChange={(event) => setNewConfirmPassword(event.target.value)}>
                        </input>
                        <div className={classes.buttons}>
                            <input type="submit" value="Sign Up" className={classes.loginButton}></input>
                        </div>
                    </form>
                </div>
            </div>
       </div>

              


    );


}





export default LoginPage;