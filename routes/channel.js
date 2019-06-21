const express = require('express');
const channelController = require('../controllers/channelController');
const {
    isAuthenticated
} = require('../middlewares/index');

module.exports.autoroute = {
    get: {
        '/kanalen*': isAuthenticated,
        '/kanalen': channelController.get,
        '/kanalen/toevoegen': channelController.add
    },

    post: {
        '/kanalen*': isAuthenticated,
        '/kanalen': [express.json(), channelController.create]
    },

    delete: {
        "/kanalen": [express.json(), channelController.remove]
    }
};