const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const accountSchema = new Schema({
    username: {
        type: String,
    },

    password: {
        type: String,
    }
});

accountSchema.pre('save', async function () {
    const account = this;

    if (account.isModified('password')) {
        account.password = await bcrypt.hash(account.password, 8);
    }
});

module.exports = model('Account', accountSchema);
