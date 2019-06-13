const {
    WebhookClient
} = require('dialogflow-fulfillment');
const question = require('../services/dialogflowService/quiz/question');
const answer = require('../services/dialogflowService/quiz/answer');

const addChannel = require('../services/dialogflowService/addChannel/addChannel');
const addChannelCode = require('../services/dialogflowService/addChannel/addChannelCode');
const addChannelCodeCheckupYes = require('../services/dialogflowService/addChannel/addChannelCodeChekupYes');

const post = (req, res) => {
    const agent = new WebhookClient({
        request: req,
        response: res
    });
    const intentMap = new Map();

    // dialogflowService.question method handles the question intent
    intentMap.set('Oefening', question);
    // dialogflowService.answer method handles the answer intent
    intentMap.set('Oefening - antwoord', answer);

    // addChannel method handles the add channel intent flow
    intentMap.set('add channel', addChannel);
    intentMap.set('add channel - code', addChannelCode);
    intentMap.set('add channel - code - checkup - yes', addChannelCodeCheckupYes);

    

    agent.handleRequest(intentMap)
};

module.exports = {
    post
};