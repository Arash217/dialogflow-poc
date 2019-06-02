const http = require('http');
const express = require('express');
const autoroute = require('express-autoroute');

const app = express();
const server = http.createServer(app);

autoroute(app, {
        throwErrors: false,
        logger: null,
    }
);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));