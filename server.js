require("dotenv").config();
const http = require("http");
const https = require('https');
const express = require("express");
const autoroute = require("express-autoroute");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const passport = require("passport");

require("./db/mongoose");
require("./auth");
require("./services/validations/locale");
const certificate = require('./encryption');

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(certificate, app);

app.use(express.urlencoded({extended: true}));

// TODO: helpers in seperate file
const hbs = exphbs.create({
    extname: ".hbs",
    helpers: {
        equals: (val1, val2) => val1 === val2
    }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, "/public")));

// TODO: session secret to .env
app.use(
    session({
        secret: "12345",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({logFn: function(){}}),
    })
);

app.use(passport.initialize());
app.use(passport.session());

autoroute(app, {
    throwErrors: false,
    logger: null
});

const httpPort = process.env.PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3001;

httpServer.listen(httpPort, () => console.log(`HTTP started on port ${httpPort}`));
httpsServer.listen(httpsPort,() => console.log(`HTTPS started on port ${httpsPort}`));