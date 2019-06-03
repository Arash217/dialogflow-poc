const exerciseController = require('../controllers/exerciseController');

module.exports.autoroute = {
    get: {
        '/exercise': exerciseController.get
    }
};