const List = require("../models/list");
const Channel = require("../models/channel");

const get = async (req, res) => {
    const username = req.user ? req.user.username : "";
    const lists = await List.find({owner: username});
    res.render("lists", {
        lists,
        username: req.user ? req.user.username : "",
        active: {
            lists: true
        }
    });
};

const add = async (req, res) => {
    const username = req.user ? req.user.username : "";
    const userChannels = await Channel.find({owner: username});

    res.render("add_list", {
        userChannels,
        active: {
            lists: true
        }
    });
};

const create = async (req, res) => {
    try {
        // validate first
        const username = req.user ? req.user.username : 'arash217';
        const newestList = await List.findOne().sort('-listCode').exec();
        let code = null;

        if (!newestList) {
            code = 999;
        }

        const {list_name: name, list_subject: subject, questions, channels} = req.body;
        const list = new List({name, subject, questions, owner: username, listCode: code + 1});
        const createdList = await list.save();

        await Channel.update(
            {
                _id: {$in: channels},
            },
            {
                "$push": {
                    "lists": createdList._id
                }
            },
            {
                multi: true
            }
        );
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
  get,
  add,
  create
};
