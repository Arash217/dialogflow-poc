const Users = require('../../../models/user');
const Channel = require('../../../models/channel');
const List = require('../../../models/list');

const exercize = async agent => {
    const conv = agent.conv();
    const _userId = conv.user.storage.userId;
    const user = await Users.findOne({
        userId: _userId
    })
    const _subject = agent.parameters.subject.toLowerCase()
    const gotList = gotLists(user)

    if (gotList) {
        const matchingLists = await getSubject(user, _subject)
        if (matchingLists.length !== 0) {

            // console.log("2----------------------------------------------------------",matchingLists, matchingLists.length)
            agent.add(`Oke ik heb ${matchingLists.length} lijsten ${_subject} gevonden, wat is de naam van de lijst die je wilt oefenen?`);
            agent.context.set({
                name: 'context-list',
                lifespan: 4,
                parameters: {
                    _subject,
                    matchingLists // _id's matching subject
                }
            })
        }else{
            agent.add(`Ik heb geen lijsten met vak ${_subject} kunnen vinden. Je kunt een lijst of een kanaal toevoegen. Weet je niet hoe, vraag dan om hulp.`)
            agent.add(`Wat wil je nu doen?`)
        }
    } else {
        agent.add(`Ik zie dat je nog geen lijsten hebt. Je zult eerst een lijst moeten toevoegen.`);
        agent.add(`Wat wil je nu doen?`)
    }

}

function gotLists(user) {
    return user.seperateLists.length !== 0;
}

async function getSubject(user, _subject) {
    const LmatchingS = await getSeperateLists(user, _subject)
    const _LmatchingS = await getListsFromChannels(CmatchingS, LmatchingS, _subject)
    return _LmatchingS
}

async function getSeperateLists(user, _subject) {
    const LmatchingS = []
    console.log(_subject);
    if (user.seperateLists.length !== 0) {
        const _lists = await List.find({
            _id: {
                $in: user.seperateLists
            },
            subject: {$regex: new RegExp("^" + _subject, "i")}
        }).select("_id").exec()
        console.log(_lists);
        //console.log(_lists)
        _lists.forEach(list => {
            LmatchingS.push(list._id)
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
            subject: {$regex: new RegExp("^" + _subject, "i")}
        }, "-_id").select("lists").exec()
        // console.log(lists)
        lists.forEach(list => {
            list.lists.forEach(listId => {
                LmatchingS.push(listId)
            })
        });
    }
    //console.log(LmatchingS)
    return LmatchingS
}



module.exports = {
    exercize
};
