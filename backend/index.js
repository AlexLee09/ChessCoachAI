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
        saveUninitialized: true,
        // store: mongoStore.create({
        //     mongoUrl: process.env.MONGODB_URI,
        // }),
        cookie: { secure: false }
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

        req.session.userId = user._id.toString(); 

        console.log ("SAVING:")
        console.log (req.session)

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
        console.log ("LOADING:")
        console.log (req.session);

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

app.get("/dashboard/getAllGames", async (req, res) => {
    try {
        const DUMMY_DATA = [
            {
                _id: "0",
                name: "Game against Wanabee GM Antoine Lee",
                date: new Date(2024, 3, 5),
                tags: ["Tag 1", "Tag 2", "Tag 3"]
            },
            {
                _id: "1",
                name: "Championship Round 5: GM Fiona Kern",
                date: new Date(2024, 3, 10),
                tags: ["Championship", "Round 5", "Tense"]
            },
            {
                _id: "2",
                name: "Friendly Match: GM Viktor Lomov vs. GM Emily Tran",
                date: new Date(2024, 3, 15),
                tags: ["Friendly", "International"]
            },
            {
                _id: "3",
                name: "Local Club Tournament Final",
                date: new Date(2024, 3, 20),
                tags: ["Local Club", "Final", "Victory"]
            },
            {
                _id: "4",
                name: "Online Blitz Match: GM John Doe vs. GM Jane Doe",
                date: new Date(2024, 3, 25),
                tags: ["Online", "Blitz", "Family Rivalry"]
            },
            {
                _id: "5",
                name: "Annual Chess Fest: GM Alex Smith Feature Game",
                date: new Date(2024, 4, 1),
                tags: ["Festival", "Featured", "Grandmaster"]
            },
            {
                _id: "6",
                name: "Historic Rivalry: GM Mikhail Tal Redux",
                date: new Date(2024, 4, 5),
                tags: ["Historic", "Rivalry", "Classic"]
            },
        ];

        const dataToSend = {
            games: DUMMY_DATA,
            status: "SUCCESS",
            message: "Successfully retrieved games for user"
        }

        res.status(200).json(dataToSend); 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});





const PORT = process.env.PORT; 
app.listen(PORT, () => // fire up express server
{
    console.log ("LISTENING ON PORT " + PORT);
}); 