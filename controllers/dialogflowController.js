const { WebhookClient } = require('dialogflow-fulfillment');

const mathQuestions = require('../mathQuestions');

let currentQuestion = 0;
let correctAnswers = 0;

module.exports.post = (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    agent.setContext({ name: 'oefening-followup', lifespan: mathQuestions.length });

    console.log(agent.session);

    function exercise () {
        const { question } = mathQuestions[currentQuestion];
        agent.add(`Vraag ${currentQuestion + 1}. Wat is ${question}?\n `);
    }

    function answer (agent) {
        const context = agent.context.get('oefening-followup');
        const antwoord = context.parameters ? context.parameters.antwoord : undefined;

        const { answer } = mathQuestions[currentQuestion];

        if (answer !== antwoord) {
            agent.add(`Dat is incorrect. Het juiste antwoord is ${answer} `);
        } else {
            agent.add(`${answer} is correct! `);
            correctAnswers++;
        }

        if (mathQuestions.length === ++currentQuestion){
            agent.add(`Je hebt ${correctAnswers} van de ${mathQuestions.length} vragen goed.`);
            return;
        }

        exercise();
    }

    let intentMap = new Map();
    intentMap.set('Oefening', exercise);
    intentMap.set('Oefening - antwoord', answer);
    agent.handleRequest(intentMap)
};