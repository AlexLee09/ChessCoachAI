require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require("connect-mongo"); 

const userModel = require('./models/user'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: mongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
        cookie: { httpOnly: false, secure: false }
    })
);

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

        req.session.userId = newUser._id; 

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
            return res.status(404).send({ status: "ERROR", message: "Username or password is incorrect" }); 
        }

        req.session.userId = user._id; 

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

// Check if user is already logged in, and return the user object if they are
app.get("/user/get", async(req, res) => 
{
    try
    {
        const userId = req.session.userId; 

        if (!userId)
            return res.status(403).json({ status: "ERROR", message: "User is not logged in" })

        const user = await userModel.findById(userId); 

        if (!user) 
            return res.status (403).json({ status: "ERROR", message: "User not found" })

        const dataToSend = {
            user: user, // todo: remove password from returned object
            status: "SUCCESS",
            message: "Found user"
        }; 

        return res.status(200).json(dataToSend); 
    }
    catch (error)
    {
        res.status(500).json({ message: "Server error" }) 
    }
})







const PORT = process.env.PORT; 
app.listen(PORT, () => // fire up express server
{
    console.log ("LISTENING ON PORT " + PORT);
}); 