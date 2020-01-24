const List = require('../../../models/list');

const exercizeWhatCode = async agent => {
    const { code } = agent.parameters;

    const list = await getList(code);

    console.log(code)
    console.log(list)

    if (list) {
        const listId = list._id;
        const listName = list.name;

        agent.context.set({
            name: 'context-excercise',
            lifespan: 0,
            parameters: {
                listId,
                listName
            }
        });

        agent.context.set({
            name: 'context-list',
            lifespan: 0,
            parameters: {}
        });

        agent.add(`dummy text else followup event wont work`);
        agent.setFollowupEvent({ "name": "intent_Oefenen", "parameters": {
            listId,
            listName
        }});
    } else {
        agent.add(`Er is geen overhoring gevonden met de code: ${code}.`);
        agent.add(`Geef een correcte code op.`);
    }
};

async function getList(code) {
    return List.findOne({
        listCode: code.toString()
    });
}

module.exports = {
    exercizeWhatCode
};