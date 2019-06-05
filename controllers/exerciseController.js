const Exercise = require('../models/exercise');

const get = async (req, res) => {
    const exercises = await Exercise.find();
    res.render('exercises', {
        exercises
    });
};

const update = async (req, res) => {
    const {subject, questions} = req.body;
    await Exercise.findByIdAndUpdate(subject, {questions});
    res.redirect('/exercises');
};

module.exports = {
    get,
    update
};