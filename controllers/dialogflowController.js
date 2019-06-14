const {WebhookClient} = require('dialogflow-fulfillment');
const {question} = require('../services/dialogflowService/quiz/question');
const {answer} = require('../services/dialogflowService/quiz/answer');

const post = (req, res) => {
    const agent = new WebhookClient({request: req, response: res});
    const intentMap = new Map();

    // dialogflowService.question method handles the question intent
    intentMap.set('Oefening', question);
    // dialogflowService.answer method handles the answer intent
    intentMap.set('Oefening - antwoord', answer);
    agent.handleRequest(intentMap)
};

module.exports = {
    post
};