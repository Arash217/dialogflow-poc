const landingpageAboutController = require('../controllers/landingpageAboutController.js');

module.exports.autoroute = {
    get: {
        '/over': landingpageAboutController.get
    }
};
