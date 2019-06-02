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

const exerciseSchema = new Schema({
    exercises: [questionSchema]
});

module.exports = model('Exercises', exerciseSchema);
