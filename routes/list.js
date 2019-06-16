const listController = require('../controllers/listController');

module.exports.autoroute = {
    get: {
        '/lijsten': listController.get,
        '/lijsten/toevoegen': listController.add
    },

    post: {
        '/lijsten': listController.update
    },
};