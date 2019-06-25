const landingpageBot = require('../controllers/landingpageBotController.js');

module.exports.autoroute = {
    get: {
        '/probeer': landingpageBot.get
    }
};
