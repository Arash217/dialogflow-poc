const Users = require('../../../models/user');
const Channel = require('../../../models/channel');
const List = require('../../../models/list');

const getListCode = async agent => {

	const conv = agent.conv();
	const userId = conv.user.storage.userId

	const user = await Users.findOne({ userId: userId });

	const channels = await getChannels(user)
	const listsArr = await getListsFromChannels(channels)
	const listsArrfull = await getSeperateLists(listsArr,user)
	const listNames = await getNamesFromLists(listsArrfull)
	const speaking = speakingArray(listNames)

	if(listNames.length !== 0){
		agent.add(`<speak>Jouw lijsten zijn:${speaking.toString().replace(/,/gm, ". <break time='0.5' /> ")} </speak>`)}
	else{
		agent.add(`Je hebt nog geen lijsten toegevoegd. Als je een lijst wilt toevoegen maar je weet niet hoe, vraag dan om hulp.`)
	}
};

async function getChannels(user) {
	const channels = []
	if (user.channelIds.length !== 0) {
		const _channel = await Channel.find({
			_id: {
				$in: user.channelIds
			}
		}).select("_id").exec()
		_channel.forEach(element => {
			channels.push(element._id)
		});
	}
	return channels
}

async function getListsFromChannels(channels) {
	const listArr = []
	
	if (channels.length !== 0) {
		const lists = await Channel.find({ // get array of all lists, from each channel resulting in; lists = [lists:[11,22,33],lists:[44,55,66],lists:[77,88,99]]
			_id: {
				$in: channels
			}
		}, "-_id").select("lists").exec()
		lists.forEach(list => {
			list.lists.forEach(listId => {
				listArr.push(listId)
			})
		});
	}
	return listArr
}

async function getSeperateLists(listArr,user) {
	console.log(user.seperateLists)
	if (user.seperateLists.length !== 0) {
		const _lists = await List.find({
			_id: {
				$in: user.seperateLists
			}
		}).select("_id").exec()
		_lists.forEach(element => {
			listArr.push(element._id)
		});
	}
	return listArr
}

async function getNamesFromLists(listArr) {
	const namesArr = []
	
	if (listArr.length !== 0) {
		const names = await List.find({ // get array of all lists, from each channel resulting in; lists = [lists:[11,22,33],lists:[44,55,66],lists:[77,88,99]]
			_id: {
				$in: listArr
			}
		},"-_id").select("name").exec()

		names.forEach(res => {
			namesArr.push(res.name)
		});
	}
	return namesArr
}

function speakingArray(listNames) {
	for (a = 0; a < listNames.length; a++) {
		listNames[a] = " " + listNames[a]
		if (a === listNames.length - 1 && listNames.length > 1) {
			listNames[a] = "En" + listNames[a] + ". "
		}
	}
	return listNames
}

module.exports = {
  getListCode
};


	