const loginController = require('../controllers/loginController');

module.exports.autoroute = {
    get: {
        '/login': loginController.get
    },

    post: {
        '/login': loginController.post
    }
};