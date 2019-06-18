const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    }
});

const listSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    listCode: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }
});



module.exports = model('List', listSchema);
