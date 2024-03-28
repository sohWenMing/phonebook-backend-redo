const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

console.log(process.argv)

dotenv.config({
    "path": path.resolve(__dirname, './.env')
})
const PASSWORD = process.env.PASSWORD;
const url = `mongodb+srv://nindgabeet:${PASSWORD}@cluster0.hb7m3ac.mongodb.net/Persons?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    number: {
        type: String,
        required: true
    }
})

const Person = mongoose.model('Person', personSchema);

const newPerson = new Person({
    name: process.argv[2],
    number: process.argv[3]
})


mongoose.connect(url).then(() => {
    console.log("Connected to DB!");
    newPerson.save().then(() => {
        console.log(`${process.argv[2]} saved`)
        mongoose.connection.close();
    })
    
})



