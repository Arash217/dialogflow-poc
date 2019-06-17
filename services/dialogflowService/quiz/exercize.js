const Users = require('../../../models/user');
const Channel = require('../../../models/channel');
const List = require('../../../models/list');

const exercize = async agent => {
    const _userId = agent.originalRequest.payload.user.userId
    const user = await Users.findOne({
        userId: _userId
    })
    const _subject = agent.parameters.subject
    // //console.log(_subject)
    const gotList = gotLists(user)


    if (gotList) {
        const matchingLists = await getSubject(user, _subject)
        if (matchingLists.length !== 0) {


            // console.log("2----------------------------------------------------------",matchingLists, matchingLists.length)
            agent.add(`Oke ik heb ${matchingLists.length} lijsten ${_subject} gevonden, welke wil je oefenen?`);
            agent.context.set({
                name: 'context-list',
                lifespan: 4,
                parameters: {
                    _subject,
                    matchingLists // _id's matching subject
                }
            })
        }else{
            agent.add(`Sorry, ik heb geen vakken voor ${_subject}`)
            agent.add(`Wat wil je nu doen?`)
        }
    } else {
        agent.add(`Sorry, je zult eerst een lijst moeten toevoegen`);
        agent.add(`Wil je een losse lijst of een kanaal met lijsten toevoegen`);
    }


}

function gotLists(user) {
    ////console.log("user", user)
    if (user.channelIds.length !== 0 || user.seperateLists.length !== 0) {
        return true
    } else {
        return false
    }
}

async function getSubject(user, _subject) {

    const CmatchingS = await getChannels(user, _subject)
    const LmatchingS = await getSeperateLists(user, _subject)
    const _LmatchingS = await getListsFromChannels(CmatchingS, LmatchingS, _subject)


    //console.log("1--------------------------------------------------------------------------------",_LmatchingS)
    return _LmatchingS

}

async function getChannels(user, _subject) {
    const CmatchingS = []
    if (user.channelIds.length !== 0) {
        //console.log(user.channelIds)
        const _channel = await Channel.find({
            _id: {
                $in: user.channelIds
            },
            subject: _subject
        }).select("_id").exec()
        //console.log(_channel)
        _channel.forEach(element => {
            CmatchingS.push(element._id)
        });

    }
    return CmatchingS

}

async function getSeperateLists(user, _subject) {
    const LmatchingS = []
    if (user.seperateLists.length !== 0) {
        const _lists = await List.find({
            _id: {
                $in: user.seperateLists
            },
            subject: _subject
        }).select("_id").exec()
        //console.log(_lists)
        _lists.forEach(list => {
            LmatchingS.push(list._id.toString())
        });
    }
    return LmatchingS

}

async function getListsFromChannels(CmatchingS, LmatchingS, _subject) {
    if (CmatchingS.length !== 0) {
        const lists = await Channel.find({ // get array of all lists, from each channel resulting in; lists = [lists:[11,22,33],lists:[44,55,66],lists:[77,88,99]]
            _id: {
                $in: CmatchingS
            },
            subject: _subject
        }, "-_id").select("lists").exec()
        // console.log(lists)
        lists.forEach(list => {
            list.lists.forEach(listId => {
                LmatchingS.push(listId)
            })
        });
    }
    console.log(LmatchingS)
    return LmatchingS
}



module.exports = {
    exercize
};