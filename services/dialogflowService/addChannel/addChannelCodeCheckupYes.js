const Users = require('../../../models/user');
const Channel = require('../../../models/channel');

const addChannelCodeCheckupYes = async agent => {
    console.log("inetent triggerd: add channel code checkup")
    const context = agent.context.get('context-channel-code');
    console.log("context:", context)
    const channelId = context && context.parameters.channelId ? context.parameters.channelId : undefined

    if (channelId) {
        const channelName = context.parameters.channelName
        const channelcode = context.parameters.channelcode
        const subject = context.parameters.subject
        const channel = await Channel.findOne({
            channelCode: channelcode.toLowerCase()
        })
        const listAmount = channel.lists.length
        const user = await Users.findOne({
            userId: agent.originalRequest.payload.user.userId
        })

        if (!user.channelIds.includes(channelId)) {
            user.channelIds.push(channelId)
            user.save()
            //console.log(user)
            agent.add(`Oke Top. ik heb kanaal ${channelName}, vak ${subject} toegevoegd. Er zijn nu ${listAmount} nieuwe lijsten beschikbaar.`);
            agent.add(`Wat wil je nu doen?`);
            
        } else {
            agent.add(`Deze lijst is al toegevoegd.`);
            agent.add(`Wat wil je nu doen?`);
        }
        agent.context.set({
            name: 'context-channel-code',
            lifespan: 0,
            parameters: {
            }
        });

    } else { // true when someone says yes to a failed atampt. 
        agent.add(`Wat is de kanaalcode?`);
    }
}

module.exports = {
    addChannelCodeCheckupYes
};