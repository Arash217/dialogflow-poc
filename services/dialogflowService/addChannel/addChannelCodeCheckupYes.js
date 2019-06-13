const Users = require('../models/users'); // need to make

const addChannelCodeCheckupYes = async agent => {
    const context = agent.context.get('context-channel-code');
    const channelId = context.channelId
    if (channelId){
        const channelName = context.channelName
        const listAmount = context.listAmount
        const subject = context.subject
        const user = await Users.findOne({userId: agent.id}) // check if agent.id is valid

        user.channelIds = user.channelIds + channelId // kan dit uberhoupt

        user.save()

        agent.add(`oke Top. ik heb kanaal ${channelName}, vak ${subject} toegevoegd. Er zijn nu ${listAmount} nieuwe lijsten beschikbaar.`);
    
    }else{ // true when someone says yes to a failed atampt. 
        agent.add(`Wat is de kanaalcode?`);
    }
}

module.exports = {
    addChannelCodeCheckupYes
};