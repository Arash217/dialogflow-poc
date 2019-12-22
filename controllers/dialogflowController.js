const {WebhookClient} = require('dialogflow-fulfillment');

const {exercizeWhatCode} = require('../services/dialogflowService/quiz/exercizeWhatCode');

const {question} = require('../services/dialogflowService/quiz/question');
const {answer} = require('../services/dialogflowService/quiz/answer');

const {onboarding} = require('../services/dialogflowService/onboarding/onboarding');


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

    // dialogflowService.onboarding method handles the onboarding intent
    intentMap.set('onboarding', onboarding);

    agent.handleRequest(intentMap)
};

module.exports = {
    post
};
