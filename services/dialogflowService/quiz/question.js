const List = require('../../../models/list');

// question intent
const question = async agent => {
    const listIdContext = agent.context.get('intent_oefenen');
    const vraagContext = agent.context.get("vraag-context") ? agent.context.get("vraag-context") : undefined;
    const correctAnswers = vraagContext ? vraagContext.parameters.correctAnswers : 0;

    let listId = listIdContext ? listIdContext.parameters.listId : vraagContext.parameters.listId;

    if (!vraagContext.parameters || !vraagContext.parameters.vragen) {
        agent.add(`Oke, gaan we ${listIdContext.parameters.listName} doen.`);

        const exercise = await List.findOne({_id: listId});     // get questions from database by listId
        vragen = exercise.questions;
    } else {
        vragen = vraagContext.parameters.vragen
    }

    if (listId) {
        // lifespan (amount of conversations) is set to a custom length, because the default is 2
        // save parameters to oefening-followup context. The context is tied to the user session.
        agent.context.set({
            name: 'vraag-context',
            lifespan: 10,
            parameters: {
                listId,
                vragen,
                correctAnswers
            }
        });
    }

    // get the current question from the list of questions that was returned by the database
    const {question} = vragen[0];
    // ask the user the question
    agent.add(`<speak>${question}<audio src="https://raw.githubusercontent.com/stijn-aa/sound/master/go1.ogg"></audio></speak>`);
};

module.exports = {
    question
};