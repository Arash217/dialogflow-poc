const {WebhookClient} = require('dialogflow-fulfillment');

const {exercize} = require('../services/dialogflowService/quiz/exercize');
const {exercizeWhatList} = require('../services/dialogflowService/quiz/exercizeWhatList');

const {question} = require('../services/dialogflowService/quiz/question');
const {answer} = require('../services/dialogflowService/quiz/answer');

const {onboarding} = require('../services/dialogflowService/onboarding/onboarding');

// Add channel
const {addChannelCode} = require('../services/dialogflowService/addChannel/addChannelCode');
const {addChannelCodeCheckupYes} = require('../services/dialogflowService/addChannel/addChannelCodeCheckupYes');

// Add list
const {addListCode} = require('../services/dialogflowService/addList/addListCode');
const {addListCodeCheckupYes} = require('../services/dialogflowService/addList/addListCodeCheckupYes');

const post = (req, res) => {

    const agent = new WebhookClient({
        request: req,
        response: res
    });

    const intentMap = new Map();

    // dialogflowService.exercize method handles the quiz intent and what list handles what list
    intentMap.set('exercize', exercize);
    intentMap.set('exercize - whatList', exercizeWhatList);

    intentMap.set('Oefening', question);
    // dialogflowService.answer method handles the answer intent
    intentMap.set('Oefening - antwoord', answer);

    // dialogflowService.onboarding method handles the onboarding intent
    intentMap.set('onboarding', onboarding);

    // addChannel method handles the add channel intent flow
    intentMap.set('add channel', addChannelCode);
    intentMap.set('add channel - code - checkup - yes', addChannelCodeCheckupYes);

    // addList method handles the add list intent flow
    intentMap.set('add list', addListCode);
    intentMap.set('add list - code - checkup - yes', addListCodeCheckupYes);

    agent.handleRequest(intentMap)
};

module.exports = {
    post
};
