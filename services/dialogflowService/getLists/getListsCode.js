const Users = require('../../../models/user');
const Channel = require('../../../models/channel');
const List = require('../../../models/list');

const getListCode = async agent => {
	console.log("intent triggerd: get list code");
	
	const userId = agent.originalRequest.payload.user.userId

	const user = await Users.findOne({ userId: userId });

	const channels = await getChannels(user)
	const listsArr = await getListsFromChannels(channels)
	const listNames = await getNamesFromLists(listsArr)
	const speaking = speakingArray(listNames)

	console.log(listNames)
	
	agent.add(`<speak>Jouw lijsten zijn:${speaking.toString().replace(/,/gm, ". <break time='0.5' /> ")} </speak>`)
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

async function getNamesFromLists(listArr) {
	const namesArr = []
	
	if (listArr.length !== 0) {
		const names = await List.find({ // get array of all lists, from each channel resulting in; lists = [lists:[11,22,33],lists:[44,55,66],lists:[77,88,99]]
			_id: {
				$in: listArr
			}
		}).select("name").exec()

		names.forEach(res => {
			namesArr.push(res.name)
		});
	}
	return namesArr
}

function speakingArray(listNames) {
	for (a = 0; a < listNames.length; a++) {
		listNames[a] = " " + listNames[a]
		if (a === listNames.length - 1) {
			listNames[a] = "En" + listNames[a] + ". "
		}
	}
	return listNames
}

module.exports = {
  getListCode
};


	