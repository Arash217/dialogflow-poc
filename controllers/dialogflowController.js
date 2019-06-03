const {WebhookClient} = require('dialogflow-fulfillment');
const dialogflowService = require('../services/dialogflowService');

const post = (req, res) => {
    const agent = new WebhookClient({request: req, response: res});
    const intentMap = new Map();

    // dialogflowService.question method handles the question intent
    intentMap.set('Oefening', dialogflowService.question);
    // dialogflowService.answer method handles the answer intent
    intentMap.set('Oefening - antwoord', dialogflowService.answer);
    agent.handleRequest(intentMap)
};

module.exports = {
    post
};