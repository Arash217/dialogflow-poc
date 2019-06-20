const List = require('../../../models/list');
const {question} = require("./question")

const exercizeWhatList = async agent => {
    console.log("inetent triggerd: exercise what list")
    console.log(agent.parameters)

    const context = agent.context.get('context-list');
    const givenListName = agent.parameters.list.toLowerCase()
    //console.log(agent.parameters)

    if(!context){
        agent.add(`Ik begrijp het niet`);
        agent.add(`Begin met "ik wil oefenen" om te oefenen`);
        return
    }

    if (context.parameters._subject) {
        const listId = await getList(context, givenListName)
        if (listId) {
            
            agent.context.set({
                name: 'context-excercise',
                lifespan: 0,
                parameters: {
                    givenListName,
                    listId
                }
            })
            agent.context.set({
                name: 'context-list',
                lifespan: 0,
                parameters: {
                }
            })
            agent.add(`dummy text else followup event wont work`);
            agent.setFollowupEvent({ "name": "intent_Oefenen", "parameters": {
                givenListName,
                listId
            }});

        } else {
            agent.add(`Ik heb ${givenListName} niet kunnen vinden`);
            agent.add(`Welke lijst wil je doen?`);
        }
    } else {
        agent.add(`ik heb geen lijsten gevonden`);
        agent.add(`er is iets mis gegaan`);
    }
}

async function getList(context, givenListName) {
    const listIds = context.parameters.matchingLists // maybe make temp database met alle lijsten met subject om daarna findeone met naam te doen
    const listIdByName = await List.findOne({
        _id: {
            $in: listIds
        },
        name: givenListName
    })
    const id = listIdByName ? listIdByName._id : undefined
    return id
}

module.exports = {
    exercizeWhatList
};