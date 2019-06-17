const List = require('../models/list');

const get = async (req, res) => {
    const exercises = await List.find();
    res.render('lists', {
        exercises
    });
};

const update = async (req, res) => {
    const {subject, questions} = req.body;
    await List.findByIdAndUpdate(subject, {questions});
    res.redirect('/lists');
};

module.exports = {
    get,
    update
};