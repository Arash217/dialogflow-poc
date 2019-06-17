const {WebhookClient} = require('dialogflow-fulfillment');

const {exercize} = require('../services/dialogflowService/quiz/exercize');
const {exercizeWhatList} = require('../services/dialogflowService/quiz/exercizeWhatList');

const {question} = require('../services/dialogflowService/quiz/question');
const {answer} = require('../services/dialogflowService/quiz/answer');
console.log('test')
const {addChannel} = require('../services/dialogflowService/addChannel/addChannel');
const {addChannelCode} = require('../services/dialogflowService/addChannel/addChannelCode');
const {addChannelCodeCheckupYes} = require('../services/dialogflowService/addChannel/addChannelCodeCheckupYes');

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

    // addChannel method handles the add channel intent flow
    intentMap.set('add channel', addChannel);
    intentMap.set('add channel - code', addChannelCode);
    intentMap.set('add channel - code - checkup - yes', addChannelCodeCheckupYes);
    
    agent.handleRequest(intentMap)
};

module.exports = {
    post
};