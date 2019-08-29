const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('../models/account');

passport.serializeUser((account, done) => done(null, account.id));

passport.deserializeUser(async (id, done) => {
    try {
        const account = await Account.findById(id);
        done(null, account);
    } catch (e) {
        done(e);
    }
});

const comparePass = (accountPassword, databasePassword) => (
    bcrypt.compareSync(accountPassword, databasePassword)
);

const invalidCredentialsError = {
    message: 'Incorrect username and/or password',
};

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const account = await Account.findOne({ username });
        if (!account) return done(invalidCredentialsError, false);
        if (!comparePass(password, account.password)) return done(invalidCredentialsError, false);
        return done(null, account);
    } catch (e) {
        return done(e);
    }
}));
