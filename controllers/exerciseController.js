const Exercise = require('../models/exercise');

const get = async (req, res) => {
    const exercises = await Exercise.find();
    res.render('exercises', {
        exercises
    });
};

module.exports = {
    get
};