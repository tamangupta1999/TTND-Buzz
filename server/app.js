const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// instance of express
const app = express();

// environment variable config
dotenv.config();

//cloudinary config
const cloudinaryConfig = require('./config/cloudnaryConfig');

//importing routes
const authenticationRoute = require('./routes/authentication');
const userRoute = require('./routes/user');
const buzzRoute = require('./routes/buzz');
const complaintRoute = require('./routes/complaint');

//importing seeding function
const initializeSuperAdmin = require('./seed/superAdmin');

//UiConfig
const uiConfigSeed = require('./seed/uiConfigSeed');

// db config  
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true"
});

// listening for the error event from the database
mongoose.connection.on("error", err => {
    console.log("err", err)
});
// listening for the success event from the database
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
});

//Seeding Super admin & UI Config in db
mongoose.connection.once("open", () => {
    // initializeSuperAdmin()
    // uiConfigSeed()
});

// CORS Handler
app.use(cors({ origin: "*", credentials: true }));

//bodyparser
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan("dev"));

//cloudinary middleware
app.use(cloudinaryConfig)

//cookie
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session())

require('./auth/google/passport')(passport);

// routes
app.use('/', authenticationRoute);
app.use('/user', userRoute);
app.use('/buzz', buzzRoute);
app.use('/complaint', complaintRoute);

// 404 routes redirect to buzz is logged in else to login
app.use('*', (req, res) => {
    if (req.user) {
        res.redirect('/buzz')
    } else {
        res.redirect('/');
    }
});

// app is listening on 
app.listen(process.env.PORT, () => console.log(`Example app listening at http://localhost:${process.env.PORT}`));

module.exports = app;