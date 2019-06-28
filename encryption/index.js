const fs = require('fs');
const path = require('path');

const certificate = {
    key: fs.readFileSync(path.join(__dirname, './certificate/certificate.key')),
    cert: fs.readFileSync(path.join(__dirname, './certificate/certificate.crt')),
    ca: fs.readFileSync(path.join(__dirname, './certificate/cabundle.crt')),
};

module.exports = certificate;