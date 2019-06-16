const List = require('../../../models/list');

// question intent
const question = async agent => {
    // get parameters from oefening-followup context
    const context = agent.context.get('oefening-followup');
    const parameters = context.parameters ? context.parameters : undefined;
    const currentQuestion = parameters.currentQuestion ? parameters.currentQuestion : 0;
    let listId = agent.parameters ? agent.parameters.listId : undefined;

    if (!listId) {
        listId = parameters.listId;
    }

    // get questions from database by listId
    const exercise = await List.findOne({_id: listId}); // moet worden uit lijst met lijst id
    const questionsList = exercise.questions;

    if (listId) {
        // lifespan (amount of conversations) is set to a custom length, because the default is 2
        // save parameters to oefening-followup context. The context is tied to the user session.
        agent.context.set({
            name: 'oefening-followup',
            lifespan: questionsList.length,
            parameters: {
                ...parameters,
                listId
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