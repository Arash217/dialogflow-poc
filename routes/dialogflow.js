const express = require('express');
const dialogflowController = require('../controllers/dialogflowController');

module.exports.autoroute = {
    get: {
        '/dialogflow': (req, res) => res.send('test'),
    },

    post: {
        '/dialogflow': [express.json(), dialogflowController.post]
    }
};