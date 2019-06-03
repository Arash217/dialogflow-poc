const Exercise = require('../models/exercise');

const get = async (req, res) => {
    const exercises = await Exercise.find();
    res.render('exercise', {
        exercises
    });
};

module.exports = {
    get
};