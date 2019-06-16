const Users = require('../../../models/user');
const Channel = require('../../../models/channel');
const List = require('../../../models/list');

const exercize = async agent => {
    const _userId = agent.originalRequest.payload.user.userId
    const user = await Users.findOne({
        userId: _userId
    })
    const _subject = agent.parameters.subject
    const gotList = gotList()
    

    if (gotLists()) {
        const matchingLists = getSubject(_subject)

        agent.add(`Oke, welke lijst wil je oefenen?`);
        agent.context.set({
            name: 'context-list',
            lifespan: 4,
            parameters: {
                subject,
                gotList,
                matchingLists // _id's matching subject
            }
        })
    } else {
        agent.add(`Sorry, je zult eerst een lijst moeten toevoegen`);
        agent.add(`Wil je een losse lijst of een kanaal met lijsten toevoegen`);
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
        const listsMatchingSubject = [] // _list._id matching subject

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
                const _list = await List.findOne({
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