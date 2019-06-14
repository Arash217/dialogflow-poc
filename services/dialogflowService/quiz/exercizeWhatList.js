const Users = require('../../../models/user');

const exercizeWhatList = async agent => {
    const _userId = agent.originalRequest.payload.user.userId
    const user = await Users.findOne({userId: _userId})
    const context = agent.context.get('context-list');


    if (context.parameters.gotList) {
        agent.add(`Oke, w`);
        agent.context.set({
            name: 'context-list',
            lifespan: 4,
            parameters: {
                gotList
            }})
    }else{
        agent.add(`Oke, dan zul je eerst een lijst moeten toevoegen`);
        agent.add(`Wil je een losse lijst of een kanaal toevoegen`);
    }

}


module.exports = {
    exercizeWhatList
};