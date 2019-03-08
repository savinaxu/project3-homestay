const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const FakeDb = require('./fake-db')
const rentalRoutes = require('./routes/rentals')
const userRoutes = require('./routes/users')
const PORT = process.env.PORT || 3001
const app = express()


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/rentals', rentalRoutes)
app.use('/api/users', userRoutes)

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/homestay"

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
        .then(() => {
            const fakeDb = new FakeDb()
            fakeDb.seedDb()
        })
        .catch(e => {
            console.log(e);
        });






// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });