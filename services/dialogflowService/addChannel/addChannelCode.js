const Channel = require('../models/channel');

const addChannelCode = async agent => {
    const channelcode = agent.parameters.channelCode
    const channel = await Channel.findOne({channelCode: channelcode.toLowerCase()})

    if (channel){ // if channel code is matched to existing channel? need to check if findOne returns false if not
        const channelName = channel.name
        const listAmount = channel.lists.lenght()
        const owner = channel.owner
        const subject = channel.subject
        const channelId = channel._id


        agent.add(`oke. ik heb ${channelName} van ${owner} gevonden, klopt dit?`);
        agent.context.set({
            name: 'context-channel-code',
            lifespan: 4 ,
            parameters: {
                channelId,
                channelName,
                listAmount,
                subject
            }
        });
    }else{
        agent.add(`ik heb hem niet kunnen vinden. Wat is de kanaalcode?`);
    }
}

module.exports = {
    addChannelCode
};