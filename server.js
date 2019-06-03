require('dotenv').config();
const http = require('http');
const express = require('express');
const autoroute = require('express-autoroute');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

require('./db/mongoose');

const app = express();
const server = http.createServer(app);

autoroute(app, {
        throwErrors: false,
        logger: null,
    }
);

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, '/public')));

// TODO: session secret to .env
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));