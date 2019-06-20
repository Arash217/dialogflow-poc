const List = require("../models/list");
const Channel = require("../models/channel");
const listValidator = require("../services/validations/list");

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
    const { body } = req;
    try {
        await listValidator.validate(body, {abortEarly: false});
        const {username} = req.user;
        const newestList = await List.findOne().sort('-listCode').exec();
        let code = null;

        if (!newestList) {
            code = 1000;
        } else {
            code = parseInt(newestList.listCode.split(' ')[1]);
            code += 1;
        }

        const {list_name: name, list_subject: subject, questions, channels} = body;
        const list = new List({name, subject, questions, owner: username, listCode: `lijst ${code}`});
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

        res.json({code});
    } catch (e) {
        res.status(400).json(e);
    }
};

module.exports = {
  get,
  add,
  create
};
