const User = require('../models/user');
const userValidator = require('../services/validations/user');

const get = async (req, res) => {
    res.render('register');
};

const post = async (req, res) => {
    const {body} = req;
    try {
        await userValidator.validate(body);
        const user = new User(body);
        await user.save();
        // res.login(user);
        res.redirect('/exercises');
    } catch (error) {
        console.log(error);
        res.status(400).render('register', {
            body,
            error,
        });
    }
};

module.exports = {
    get,
    post
};