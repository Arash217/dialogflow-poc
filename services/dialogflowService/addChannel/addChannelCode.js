const Channel = require('../../../models/channel');

const addChannelCode = async agent => {
    const channelcode = agent.parameters.channelCode
    const channel = await Channel.findOne({
        channelCode: channelcode.toLowerCase()
    })

    if (channel) { // if channel code is matched to existing channel? need to check if findOne returns false if not
        const channelName = channel.name
        const owner = channel.owner
        const subject = channel.subject
        const channelId = channel._id

        agent.add(`oke. ik heb het kanaal: ${channelName} van ${owner} gevonden, klopt dit?`);
        agent.context.set({
            name: 'context-channel-code',
            lifespan: 3,
            parameters: {
                channelId,
                channelName,
                subject,
                channelcode
            }
        });
    } else {
        agent.add(`ik heb hem niet kunnen vinden. Wat is de kanaalcode?`);
    }
}

module.exports = {
    addChannelCode
};