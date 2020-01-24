const {WebhookClient} = require('dialogflow-fulfillment');

const {exercizeWhatCode} = require('../services/dialogflowService/quiz/exercizeWhatCode');
const {question} = require('../services/dialogflowService/quiz/question');
const {answer} = require('../services/dialogflowService/quiz/answer');

const post = (req, res) => {
    const agent = new WebhookClient({
        request: req,
        response: res
    });

    const intentMap = new Map();

    // dialogflowService.exercize method handles the quiz intent and what list handles what list
    intentMap.set('exercize - code', exercizeWhatCode);

    intentMap.set('Oefening', question);
    // dialogflowService.answer method handles the answer intent
    intentMap.set('Oefening - antwoord', answer);

    agent.handleRequest(intentMap)
};

module.exports = {
    post
};
