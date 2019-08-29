const Users = require('../../../models/user');
const List = require('../../../models/list');

const addListCodeCheckupYes = async agent => {
    console.log("inetent triggerd: add list code checkup")
    console.log(agent.parameters)

    const context = agent.context.get('context-list-code');
    console.log("context:", context)
    const listId = context && context.parameters.listId ? context.parameters.listId : undefined

    if (listId) {
        const listName = context.parameters.listName
        const listcode = context.parameters.listCode
        const subject = context.parameters.subject
        const list = await List.findOne({
            listCode: listcode.toLowerCase()
        })
        // const listAmount = list.lists.length
        const conv = agent.conv();
        console.log("user", conv.user.storage.userId)
        const user = await Users.findOne({
            userId: conv.user.storage.userId
        })

        if (!user.seperateLists.includes(listId)) {
            user.seperateLists.push(listId)
            user.save()
            //console.log(user)
            agent.add(`Oke Top. ik heb lijst ${listName} toegevoegd. Je nieuwe lijst is nu beschikbaar.`);
            agent.add(`Wat wil je nu doen?`);

        } else {
            agent.add(`Deze lijst is al toegevoegd.`);
            agent.add(`Wat wil je nu doen?`);
        }
        agent.context.set({
            name: 'context-list-code',
            lifespan: 0,
            parameters: {
            }
        });

    } else { // true when someone says yes to a failed atampt.
        agent.add(`Wat is de kanaalcode?`);
    }
}

module.exports = {
    addListCodeCheckupYes
};
