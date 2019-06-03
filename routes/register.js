const registerController = require('../controllers/registerController');

module.exports.autoroute = {
    get: {
        '/register': registerController.get
    }
};