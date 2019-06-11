const Account = require('../models/account');
const accountValidator = require('../services/validations/user');

const get = async (req, res) => {
    res.render('register');
};

// TODO: handle edge cases
const post = async (req, res) => {
    const {body} = req;
    try {
        await accountValidator.validate(body);
        const account = new Account(body);
        await account.save();
        req.login(account, () => {
            return res.redirect('/exercises');
        });
    } catch (error) {
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