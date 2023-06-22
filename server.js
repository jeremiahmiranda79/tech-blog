// import express
const express = require('express');

// import the connection to the database
const sequelize = require('./config/connection');

// temp to recognize the models
require('./models');// this line will no noger be needed after we bring in our models via the routes

// set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// connect to the database before starting the express server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
});