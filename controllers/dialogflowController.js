const {WebhookClient} = require('dialogflow-fulfillment');

const questions = require('../questions');

module.exports.post = (req, res) => {
    const agent = new WebhookClient({request: req, response: res});

    function exercise() {
        const context = agent.context.get('oefening-followup');
        const parameters = context.parameters ? context.parameters : undefined;
        const currentQuestion = parameters.currentQuestion ? parameters.currentQuestion : 0;
        let VakType = agent.parameters ? agent.parameters.VakType : undefined;

        if (!VakType) {
            VakType = parameters.VakType;
        }

        const questionsList = questions[VakType.toLowerCase()];

        if (VakType) {
            agent.context.set({
                name: 'oefening-followup',
                lifespan: questionsList.length,
                parameters: {
                    ...parameters,
                    VakType
                }
            });
        }

        const {question} = questionsList[currentQuestion];
        agent.add(`Vraag ${currentQuestion + 1}. ${question} `);
    }

    function answer() {
        const context = agent.context.get('oefening-followup');
        const parameters = context.parameters ? context.parameters : undefined;
        const antwoord = parameters.antwoord ? parameters.antwoord : undefined;
        const currentQuestion = parameters.currentQuestion ? parameters.currentQuestion : 0;
        let correctAnswers = parameters.correctAnswers ? parameters.correctAnswers : 0;
        const VakType = parameters.VakType;

        const questionsList = questions[VakType.toLowerCase()];

        const {answer} = questionsList[currentQuestion];

        if (answer !== antwoord) {
            agent.add(`${antwoord} is incorrect. Het juiste antwoord is ${answer}. `);
        } else {
            agent.add(`${answer} is correct! `);
            correctAnswers++;
        }

        if (questionsList.length - 1 === currentQuestion) {
            agent.add(`Je hebt ${correctAnswers} van de ${questionsList.length} vragen goed. `);

            agent.context.set({
                name: 'oefening-followup',
                parameters: {
                    currentQuestion: 0,
                    correctAnswers: 0
                }
            });

            return;
        }

        agent.context.set({
            name: 'oefening-followup',
            lifespan: questionsList.length,
            parameters: {
                ...parameters,
                currentQuestion: currentQuestion + 1,
                correctAnswers
            }
        });

        exercise();
    }

    let intentMap = new Map();
    intentMap.set('Oefening', exercise);
    intentMap.set('Oefening - antwoord', answer);
    agent.handleRequest(intentMap)
};