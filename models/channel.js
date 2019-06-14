const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const channelSchema = new Schema({
    channelCode: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    lists: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
});

module.exports = model('Channel', channelSchema);
