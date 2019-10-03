const express = require("express")
const channelController = require("../controllers/channelController");
const {isAuthenticated} = require('../middlewares/index');

module.exports.autoroute = {
    get: {
        '/kanalen*': isAuthenticated,
        "/kanalen": channelController.get,
        "/kanalen/toevoegen": channelController.add,
        "/kanalen/:id": channelController.update
    },

    post: {
        '/kanalen*': isAuthenticated,
        "/kanalen": [express.json(), channelController.create]
    },

    patch: {
        "/kanalen/:id": [express.json(), channelController.save]
    },
    delete: {
        "/kanalen": [express.json(), channelController.remove]
      }
};

