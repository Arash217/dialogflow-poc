const List = require('../models/list');
const Channel = require('../models/channel');

const get = async (req, res) => {
    const username = req.user ? req.user.username : "";
    const channels = await Channel.find({ owner: username });
    console.log(channels);
    res.render('channels', {
        channels,
        username: req.user ? req.user.username : '',
        active: {
            channels: true
        }
    });
};

const add = async(req, res)=>{
    const username = req.user ? req.user.username: "";
    const userLists = await List.find({owner: username});
    console.log(userLists);

    res.render('add_channel', {
      userLists,
      active: {
          channels: true
      }
    });
  }

module.exports = {
    get,
    add
};
