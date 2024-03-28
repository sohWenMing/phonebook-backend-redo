const express = require('express');
const app = express();
const router = require('./router/router')
const MongoConnection = require('./models/index')
const PORT = process.env.PORT || 3000;




MongoConnection.connectToDatabase()
.then(() => {
    console.log("successfully connected!");
    app.use(express.json());
    app.use(router);
    
    app.use((err, req, res, next) => {
        console.error("Error from main index file: ", err.message);
        res.send(err.message);
    })
})
.catch((err) => {
    console.log("Problem with connection");
    process.exit(1)
})


//---------------------------------Establishing initial DB connection------------------------------




app.listen(PORT, () => {
    console.log("Getting something on port 3000")
})

