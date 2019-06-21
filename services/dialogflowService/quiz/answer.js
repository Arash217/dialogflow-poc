const {question} = require("./question")

// answer intent
const answer = async agent => {
    console.log("inetent triggerd: answer")
    console.log(agent.parameters)
    
    const vraagContext = agent.context.get("vraag-context") ? agent.context.get("vraag-context") : undefined
    let correctAnswers = vraagContext.parameters ? vraagContext.parameters.correctAnswers : 0;


    let listId = vraagContext.parameters.listId

    const givenAnswer = agent.parameters.antwoord

    // get questions from database by subject

    const vragen = vraagContext.parameters.vragen



    !vragen[0].status && (vragen[0].status = 0)
    

    // get the correct answer for the current questions
    const {answer} = vragen[0];

    // check whether the answer is correct or not
    if (answer.toLowerCase() !== givenAnswer.toLowerCase()) {

        agent.add("<speak> <audio src='https://raw.githubusercontent.com/stijn-aa/sound/master/incorrect1.ogg'>incorrect</audio>"+` ${givenAnswer} is incorrect. Het juiste antwoord is ${answer}.</speak> `);
        
        if(vragen[0].status === -2){
            vragen.splice(0, 1)
        }else if(vragen[0].status === 0){
            vragen[0].status --
            vragen.push(vragen[0])
        }else{
            vragen[0].status --
        }


    } else {
        agent.add("<speak> <audio src='https://raw.githubusercontent.com/stijn-aa/sound/master/correct2.ogg'>correct</audio>"+` ${answer} is correct! </speak>`);
        // if answer is correct then increment

        if(vragen[0].status === 0){
            vragen.splice(0, 1)
            correctAnswers ++
        }else{
            vragen.splice(0, 1)
        }

    }


    // if there are no questions left, then tell the user how many questions he had correct
    if (vragen[0] === undefined) {
        agent.add(`Dit was de lijst. Je hebt ${correctAnswers} van de ${questionsList.length} vragen goed. Wat wil je nu doen?`);

        // reset the parameters of the context
        agent.context.set({
            name: 'vraag-context',
            lifespan: 0,
            parameters: {
            }
        });

        return;
    }

    // save parameters to oefening-followup context. The context is tied to the user session.
    agent.context.set({
        name: 'vraag-context',
        lifespan: 10,
        parameters: {
            listId,
            correctAnswers,
            vragen,
        }
    });

    console.log(vragen)

    // ask the next question
    await question(agent);
};


module.exports = {
    answer
};