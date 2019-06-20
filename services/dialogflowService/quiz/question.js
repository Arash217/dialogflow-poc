const List = require('../../../models/list');

// question intent
const question = async agent => {
    console.log("inetent triggerd: question")
    console.log(agent.parameters)
    
    const listIdContext = agent.context.get('intent_oefenen');
    const vraagContext = agent.context.get("vraag-context") ? agent.context.get("vraag-context") : undefined
    const correctAnswers = vraagContext.parameters ? vraagContext.parameters.correctAnswers : 0;
    let currentQuestion= vraagContext.parameters ? vraagContext.parameters.currentQuestion : 0;
    console.log(currentQuestion)

    let listId = listIdContext ? listIdContext.parameters.listId : vraagContext.parameters.listId

    if (currentQuestion === 0) {
        agent.add(`<speak> Oke, gaan we ${listIdContext.parameters.givenListName} doen </speak>`);
    }

    // get questions from database by listId
    const exercise = await List.findOne({_id: listId}); // moet worden uit lijst met lijst id
    const questionsList = exercise.questions;
  
    if (listId) {
        // lifespan (amount of conversations) is set to a custom length, because the default is 2
        // save parameters to oefening-followup context. The context is tied to the user session.
        agent.context.set({
            name: 'vraag-context',
            lifespan: questionsList.length,
            parameters: {
                listId,
                currentQuestion,
                correctAnswers
            }
        });
    }
    
    // get the current question from the list of questions that was returned by the database
    const {question} = questionsList[currentQuestion];
    // ask the user the question
    agent.add(`<speak> Vraag ${currentQuestion + 1}. ${question}  <audio src="https://raw.githubusercontent.com/stijn-aa/sound/master/go1.ogg">go</audio> </speak>`);
};

module.exports = {
    question
};