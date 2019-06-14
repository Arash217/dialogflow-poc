const Users = require('../../../models/user');

const exercize = async agent => {
    const _userId = agent.originalRequest.payload.user.userId
    const user = await Users.findOne({
        userId: _userId
    })
    const _subject = agent.parameters.subject
    const gotList = gotList()
    const matchingLists = getSubject(_subject)

    if (gotLists()) {
        agent.add(`Oke, welke lijst wil je oefenen?`);
        agent.context.set({
            name: 'context-list',
            lifespan: 4,
            parameters: {
                subject,
                gotList,
                matchingLists
            }
        })
    } else {
        agent.add(`Oke, dan zul je eerst een lijst moeten toevoegen`);
        agent.add(`Wil je een losse lijst of een kanaal toevoegen`);
    }

    function gotLists() {
        if (user.channelIds.length() !== 0 || user.seperateLists.length() !== 0) {
            return true
        } else {
            return false
        }
    }

    function getSubject(subject) {
        const ChannelsMatchingSubject = []
        const listsMatchingSubject = []

        if (user.channelIds.length() !== 0) {
            user.channelIds.forEach(channel => {
                const _channel = await Channel.findOne({
                    _id: channel,
                    subject: _subject
                })
                ChannelsMatchingSubject.push(_channel._id)
            });
        }

        if (user.seperateLists.length() !== 0) {
            user.seperateLists.forEach(list => {
                const _list = await list.findOne({
                    _id: list,
                    subject: _subject
                })
                listsMatchingSubject.push(_list._id)
            });
        }

        if (ChannelsMatchingSubject.length() !== 0) {
            ChannelsMatchingSubject.forEach(channel => {
                const _channel = await Channel.findOne({
                    _id: channel,
                    subject: _subject
                })
                _channel.lists.forEach(list => {
                    listsMatchingSubject.push(list)
                })
            });
        }

        return listsMatchingSubject
    }
}


module.exports = {
    exercize
};