require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userModel = require('./models/user'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect (process.env.MONGODB_URI)
    .then(() => console.log("CONNECTED TO DB"))
    .catch((error) => console.error(error));

app.post("/user/new", async(req, res) => 
{
    try
    {
        const { username, email, password } = req.body; 

        const existingUsername = await userModel.find({ username: username }); 
        if (!existingUsername){
            res.status(400).json({ status: "ERROR", message: "A user with this username already exists" }); 
            return}
        const existingEmail = await userModel.find({ email: email }); 
        if (!existingEmail){
            res.status(400).json({ status: "ERROR", message: "A user with this email already exists" });
            return} 

        const newUser = await userModel.create ({
            username: username, 
            email: email, 
            password: password,
        }); 

        console.log ("Created new user with username: " + username); 

        const dataToSend = {
            status: "SUCCESS",
            message: "Account created successfully",
            user: newUser
        }

        res.status(200).send(dataToSend); 
    }
        catch (error)
        {
            res.status(500).json({ message: "Server error" }) 
        }
    }); 

app.post("/user/login", async(req, res) => 
{
    try
    {
        const { username, password } = req.body; 

        const user = await userModel.findOne({ 
            username: username, 
            password: password 
        }); 

        if (!user){
            res.status(404).send({ status: "ERROR", message: "Username or password is incorrect" }); 
            return}

        const dataToSend = {
            status: "SUCCESS", 
            message: "User logged in successfully",
            user: user,
        }

        res.status(200).send(dataToSend); 
    }
    catch (error)
    {
        res.status(500).json({ message: "Server error" }) 
    }
});








const PORT = process.env.PORT; 
app.listen(PORT, () => // fire up express server
{
    console.log ("LISTENING ON PORT " + PORT);
}); 