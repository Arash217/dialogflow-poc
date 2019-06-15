const listController = require('../controllers/listController');

module.exports.autoroute = {
    get: {
        '/lijsten': listController.get
    },

    post: {
        '/lijsten': listController.update
    }
};