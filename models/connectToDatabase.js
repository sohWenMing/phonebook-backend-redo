const mongoose = require('./mongooseInstance');
console.log(typeof mongoose);
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    "path": path.resolve(__dirname, '../.env')
})
const PASSWORD = process.env.PASSWORD;
const url = `mongodb+srv://nindgabeet:${PASSWORD}@cluster0.hb7m3ac.mongodb.net/Persons?retryWrites=true&w=majority`

async function connectToDatabase() {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB database")
    }catch(error) {
        throw error
    }
}

module.exports = connectToDatabase;




