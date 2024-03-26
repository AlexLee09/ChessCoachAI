require('dotenv').config()

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const PORT = process.env.PORT; 





  

app.listen(PORT, () => // fire up express server
{
    console.log ("LISTENING ON PORT " + PORT);
}); 