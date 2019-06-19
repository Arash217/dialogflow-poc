const loginController = require('../controllers/loginController');

module.exports.autoroute = {
    get: {
        '/login': loginController.get,
        '/logout': loginController.logout
    },

    post: {
        '/login': loginController.post
    }
};