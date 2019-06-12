const Exercise = require('../models/exercise');

// question intent
const question = async agent => {
    // get parameters from oefening-followup context
    const context = agent.context.get('oefening-followup');
    const parameters = context.parameters ? context.parameters : undefined;
    const currentQuestion = parameters.currentQuestion ? parameters.currentQuestion : 0;
    let VakType = agent.parameters ? agent.parameters.VakType : undefined;

    if (!VakType) {
        VakType = parameters.VakType;
    }

    // get questions from database by subject
    const exercise = await Exercise.findOne({subject: VakType.toLowerCase()});
    const questionsList = exercise.questions;

    if (VakType) {
        // lifespan (amount of conversations) is set to a custom length, because the default is 2
        // save parameters to oefening-followup context. The context is tied to the user session.
        agent.context.set({
            name: 'oefening-followup',
            lifespan: questionsList.length,
            parameters: {
                ...parameters,
                VakType
            }
        });
    }

    // get the current question from the list of questions that was returned by the database
    const {question} = questionsList[currentQuestion];
    // ask the user the question
    agent.add(`Vraag ${currentQuestion + 1}. ${question} `);
};

module.exports = {
    question
};