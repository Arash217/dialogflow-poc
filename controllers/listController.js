const Exercise = require('../models/exercise');

const get = async (req, res) => {
    const exercises = await Exercise.find();
    res.render('lists', {
        exercises,
        username: req.user ? req.user.username : '',
        active: {
            lists: true
        }
    });
};

const add = async (req, res) => {
    res.render('add_list', {
        active: {
            lists: true
        }
    });
};

const update = async (req, res) => {
    const {subject, questions} = req.body;
    await Exercise.findByIdAndUpdate(subject, {questions});
    res.redirect('/lists');
};

module.exports = {
    get,
    update,
    add
};
