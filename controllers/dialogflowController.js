const {WebhookClient} = require('dialogflow-fulfillment');

const dialogflowService = require('../services/dialogflowService');

module.exports.post = (req, res) => {
    const agent = new WebhookClient({request: req, response: res});
    let intentMap = new Map();
    intentMap.set('Oefening', dialogflowService.question);
    intentMap.set('Oefening - antwoord', dialogflowService.answer);
    agent.handleRequest(intentMap)
};