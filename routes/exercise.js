const exerciseController = require('../controllers/exerciseController');

module.exports.autoroute = {
    get: {
        '/exercises': exerciseController.get
    }
};