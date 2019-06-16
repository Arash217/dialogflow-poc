const Users = require('../../../models/user');
const List = require('../../../models/list');

const exercizeWhatList = async agent => {
    const _userId = agent.originalRequest.payload.user.userId
    const user = await Users.findOne({
        userId: _userId
    })
    const context = agent.context.get('context-list');
    const givenListName = agent.parameters.any

    if (context.parameters.gotList) {
        const listId = getList(givenListName)
        if (listId) {
            agent.add(`Oke, gaan we ${listName} doen`);
            agent.context.set({
                name: 'context-excercise',
                lifespan: 4,
                parameters: {
                    listId
                }
            })

           await question(agent)

        } else {
            agent.add(`Ik heb ${givenListName} niet kunnen vinden`);
            agent.add(`Welke lijst wil je doen?`);
        }
    } else {
        agent.add(`got list bestaat niet`);
        agent.add(`even geen idee wat heir moet staan`);
    }

    function getList(givenListName) {
        const listIds = context.parameters.gotList // maybe make temp database met alle lijsten met subject om daarna findeone met naam te doen

        const listsByName = await List.find({
            name: givenListName
        })

        listsByName.forEach(listObj => {
            listIds.forEach(id => {
                if (listObj._id === id)
                    return id
            });
        });
    }

}


module.exports = {
    exercizeWhatList
};