const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    channelIds: {
        type: Array,
        required: true
    },
    seperateLists: {
        type: Array,
        required: true
    },
    lastLogin: {
        type: String,
        required: true
    }
});

module.exports = model('User', userSchema);
