const passport = require('passport');

const get = async (req, res) => {
    res.render('login');
};

const post = async (req, res, next) => {
    return passport.authenticate('local', async (error, user) => {
        if (user) {
            req.login(user, () => {
                return res.redirect('/exercises');
            });
            return;
        }
        res.status(400).render('login', {
            body: req.body,
            error,
        });
    })(req, res, next);
};

module.exports = {
    get,
    post
};