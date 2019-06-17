const express = require('express');
const dialogflowController = require('../controllers/dialogflowController');//

module.exports.autoroute = {
    post: {
        '/dialogflow': [express.json(), dialogflowController.post]
    }
};