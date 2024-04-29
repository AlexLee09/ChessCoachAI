const mongoose = require ("mongoose")

const { Schema, model } = mongoose; 

const schema = new Schema({
    username: 
    {
        type: String, 
        unique: true, 
        required: true
    },
    email: 
    {
        type: String, 
        unique: true, 
        required: true
    },
    password: 
    {
        type: String, 
        unique: false, 
        required: true
    }
})

module.exports = model ("User", schema); 