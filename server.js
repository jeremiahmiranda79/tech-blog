// import path
const path = require('path');
// import express
const express = require('express');
// import express-session
const session = require('express-session');
// import SequelizeStore constructor
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// import the connection to the database
const sequelize = require('./config/connection');
// import our routes
const routes= require('./controllers')
// import express-handlebars
const exphbs = require('express-handlebars');
// set up handlebars object
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// configure session object
const sess = {
    // secret is used to sign the cookies
    secret: process.env.SECRET,
    // cookie options
    cookie: {
        // cookie will expire after one hour, expressed in milliseconds
        maxAge: 60 * 60 * 1000, // 1 hour in ms
        // only store session cookies when the protocol used by the client to connect to our server is HTTP
        httpOnly: true,
        secure: false
    },
    // resave session to store even if session is not modified during request-response cycle
    resave: false,
    // save uninitialized session to store (uninitialized means new but not modified)
    saveUninitialized: false,
    // set up session store
    store: new SequelizeStore({
        // connect to our database to save sessions there
        db: sequelize
    })
}

// mount session middleware
app.use(session(sess));

// mount the handlebars as the default template engine
app.engine('handlebars', hbs.engine);
// app.engine('handlebars', exphbs.engine ({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// set up middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount static middleware
app.use(express.static(path.join(__dirname, 'public')));

// mount the routes
app.use(routes);

// connect to the database before starting the express server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
});