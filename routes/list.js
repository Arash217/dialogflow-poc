const express = require("express");
const listController = require("../controllers/listController");
const {isAuthenticated} = require('../middlewares/index');

module.exports.autoroute = {
    get: {
        '/lijsten*': isAuthenticated,
        '/lijsten': listController.get,
        '/lijsten/toevoegen': listController.add,
        '/lijsten/:id': listController.update
    },

    post: {
        '/lijsten*': isAuthenticated,
        "/lijsten": [express.json(), listController.create]
    },

    delete: {
        '/lijsten*': isAuthenticated,
        "/lijsten": [express.json(), listController.remove]
    },

    patch: {
        '/lijsten*': isAuthenticated,
        '/lijsten/:id': [express.json(), listController.save]
    }
};
