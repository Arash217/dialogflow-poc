const Exercise = require('../models/exercise');

// TODO: refactor

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

// answer intent
const answer = async agent => {
    // get parameters from oefening-followup context
    const context = agent.context.get('oefening-followup');
    const parameters = context.parameters ? context.parameters : undefined;
    const antwoord = parameters.antwoord ? parameters.antwoord : undefined;
    const currentQuestion = parameters.currentQuestion ? parameters.currentQuestion : 0;
    let correctAnswers = parameters.correctAnswers ? parameters.correctAnswers : 0;
    const VakType = parameters.VakType;

    // get questions from database by subject
    const exercise = await Exercise.findOne({subject: VakType.toLowerCase()});
    const questionsList = exercise.questions;

    // get the correct answer for the current questions
    const {answer} = questionsList[currentQuestion];

    // check whether the answer is correct or not
    if (answer !== antwoord) {
        agent.add(`${antwoord} is incorrect. Het juiste antwoord is ${answer}. `);
    } else {
        agent.add(`${answer} is correct! `);
        // if answer is correct then increment
        correctAnswers++;
    }

    // if there are no questions left, then tell the user how many questions he had correct
    if (questionsList.length - 1 === currentQuestion) {
        agent.add(`Je hebt ${correctAnswers} van de ${questionsList.length} vragen goed. `);

        // reset the parameters of the context
        agent.context.set({
            name: 'oefening-followup',
            parameters: {
                currentQuestion: 0,
                correctAnswers: 0
            }
        });

        return;
    }

    // save parameters to oefening-followup context. The context is tied to the user session.
    agent.context.set({
        name: 'oefening-followup',
        lifespan: questionsList.length,
        parameters: {
            ...parameters,
            currentQuestion: currentQuestion + 1,
            correctAnswers
        }
    });

    // ask the next question
    await question(agent);
};

module.exports = {
    question,
    answer
};