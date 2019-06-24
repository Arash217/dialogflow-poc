const {question} = require("./question")
const List = require('../../../models/list');

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
        
 
        if(vragen[0].status === 0){

            vragen[0].status --             // dus min 1
            vragen.push(vragen[0])

        }else if(vragen[0].status === -1){ 
            vragen[0].status --             // dus min 2
            vragen.splice(0, 1)
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

        let grade = new String
        
        const exercise = await List.findOne({_id: listId});     // get questions from database by listId
        totalQuestions = exercise.questions;

        if(correctAnswers >= totalQuestions.length*0.65){
            grade = "voldoende"
        }else{
            grade = "onvoldoende"
        }

        agent.add(`Dit was de lijst. Je hebt ${correctAnswers} van de ${totalQuestions.length} vragen in een keer goed beantwoord. Je hebt een ${grade}. Wat wil je nu doen?`);

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