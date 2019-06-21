const express = require('express')
const channelController = require('../controllers/channelController');

module.exports.autoroute = {
    get: {
        '/kanalen': channelController.get,
        '/kanalen/toevoegen': channelController.add
    },

    post:{
      '/kanalen': [express.json(), channelController.create]
    },

    delete: {
      "/kanalen": [express.json(), channelController.remove]
    }
};
