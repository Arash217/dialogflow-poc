const List = require('../../../models/list');
const {question} = require("./question")

// answer intent
const answer = async agent => {
    console.log("inetent triggerd: answer")
    
    const vraagContext = agent.context.get("vraag-context") ? agent.context.get("vraag-context") : undefined
    let currentQuestion= vraagContext.parameters && vraagContext.parameters.currentQuestion ? vraagContext.parameters.currentQuestion : 0 ;
    let correctAnswers = vraagContext.parameters ? vraagContext.parameters.correctAnswers : 0;
   // console.log(currentQuestion)
    
    let listId = vraagContext.parameters.listId
   // console.log("-----------------------------------------------------",listId)

    const givenAnswer = agent.parameters.antwoord

    // get questions from database by subject
    const exercise = await List.findOne({_id: listId});
    const questionsList = exercise.questions;

    // get the correct answer for the current questions
    const {answer} = questionsList[currentQuestion];

    // check whether the answer is correct or not
    if (answer !== givenAnswer) {
        agent.add(`${givenAnswer} is incorrect. Het juiste antwoord is ${answer}. `);
    } else {
        agent.add(`${answer} is correct! `);
        // if answer is correct then increment
        correctAnswers++;
    }

    // if there are no questions left, then tell the user how many questions he had correct
    if (questionsList.length - 1 === currentQuestion) {
        agent.add(`Dit was de lijst. Je hebt ${correctAnswers} van de ${questionsList.length} vragen goed. Wat wil je nu doen?`);

        // reset the parameters of the context
        agent.context.set({
            name: 'vraag-context',
            lifespan: 0,
            parameters: {
                currentQuestion: 0,
                correctAnswers: 0
            }
        });

        return;
    }

    // save parameters to oefening-followup context. The context is tied to the user session.
    agent.context.set({
        name: 'vraag-context',
        lifespan: questionsList.length,
        parameters: {
            listId,
            currentQuestion: currentQuestion + 1,
            correctAnswers
        }
    });

    // ask the next question
    await question(agent);
};

module.exports = {
    answer
};