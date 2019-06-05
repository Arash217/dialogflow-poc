const exerciseController = require('../controllers/exerciseController');

module.exports.autoroute = {
    get: {
        '/exercises': exerciseController.get
    },

    post: {
        '/exercises': exerciseController.update
    }
};