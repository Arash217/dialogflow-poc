const List = require('../../../models/list');
const {question} = require("./question")

const exercizeWhatList = async agent => {
    //console.log(agent)

    const context = agent.context.get('context-list');
    const givenListName = agent.parameters.list
    //console.log(agent.parameters)

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
            console.log("event trigger")
            agent.add(`dummy text else followup event wont work`);
            agent.setFollowupEvent({ "name": "intent_Oefenen","lifespan": "3", "parameters": {
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
    //console.log(listIdByName)
    return id
}

module.exports = {
    exercizeWhatList
};