const landingpageController = require('../controllers/landingpageController.js');

module.exports.autoroute = {
    get: {
        '/': landingpageController.get
    }
};