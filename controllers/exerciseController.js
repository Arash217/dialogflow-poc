const Exercise = require('../models/exercise');

module.exports.get = async (req, res) => {
    const exercises = await Exercise.find();
    res.render('exercise', {
        exercises
    });
};