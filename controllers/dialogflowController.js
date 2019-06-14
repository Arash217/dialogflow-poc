const {WebhookClient} = require('dialogflow-fulfillment');
const {question} = require('../services/dialogflowService/quiz/question');
const {answer} = require('../services/dialogflowService/quiz/answer');

const {onboarding} = require('../services/dialogflowService/onboarding/onboarding');

// Add channel
const {addChannel} = require('../services/dialogflowService/addChannel/addChannel');
const {addChannelCode} = require('../services/dialogflowService/addChannel/addChannelCode');
const {addChannelCodeCheckupYes} = require('../services/dialogflowService/addChannel/addChannelCodeCheckupYes');

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

    // dialogflowService.onboarding method handles the onboarding intent
    intentMap.set('onboarding', onboarding);

    // addChannel method handles the add channel intent flow
    intentMap.set('add channel', addChannel);
    intentMap.set('add channel - code', addChannelCode);
    intentMap.set('add channel - code - checkup - yes', addChannelCodeCheckupYes);
    
    agent.handleRequest(intentMap)
};

module.exports = {
    post
};