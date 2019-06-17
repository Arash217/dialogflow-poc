const channelController = require('../controllers/channelController');

module.exports.autoroute = {
    get: {
        '/kanalen': channelController.get,
        '/kanalen/toevoegen': channelController.add
    },
}
