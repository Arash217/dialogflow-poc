const express = require('express')
const channelController = require('../controllers/channelController');

module.exports.autoroute = {
    get: {
        '/kanalen': channelController.get,
        '/kanalen/toevoegen': channelController.add,
        '/kanalen/:id': channelController.update
    },

    post:{
      '/kanalen': [express.json(), channelController.create]
    },

    patch: {
      '/kanalen/:id': [express.json(), channelController.save]
    }
};
