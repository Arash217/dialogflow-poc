const publicController = require('../controllers/publicController.js');

module.exports.autoroute = {
    get: {
        '/': publicController.homePage,
        '/over': publicController.aboutPage,
        '/probeer': publicController.usePage,
        '/privacy': publicController.privacyPage,
    }
};