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
    const {body} = req;
    try {
        await listValidator.validate(body, {abortEarly: false});
        const {username} = req.user;
        const newestList = await List.findOne()
            .sort("-listCode")
            .exec();
        let code = null;

        if (!newestList) {
            code = 1000;
        } else {
            code = parseInt(newestList.listCode.split(" ")[1]);
            code += 1;
        }

        const {
            list_name: name,
            list_subject: subject,
            questions,
            channels
        } = body;

        const list = new List({
            name,
            subject,
            questions,
            owner: username,
            listCode: `lijst ${code}`
        });

        const createdList = await list.save();

        await Channel.update(
            {
                _id: {$in: channels}
            },
            {
                $push: {
                    lists: createdList._id.toString()
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

const remove = async (req, res) => {
    const username = req.user.username;
    const listId = req.body.listId;
    const removed = await List.findOneAndRemove({owner: username, _id: listId});

    if (removed) {
        await Channel.update(
            {lists: listId},
            {$pullAll: {lists: [listId]}},
            {multi: true}
        );
        res.json({});
    } else {
        res.status(400).json({});
    }
};

const update = async (req, res) => {
    const {username} = req.user;
    const {id} = req.params;
    const list = await List.findOne({owner: username, _id: id});
    const userChannels = await Channel.find({owner: username}).lean().exec();

    userChannels.forEach(userChannel => {
        if (userChannel.lists.includes(id)) userChannel.selected = true;
    });

    res.render("update_list", {
        list,
        username,
        userChannels,
        active: {
            lists: true
        }
    });
};

const save = async (req, res) => {
    const {body} = req;
    try {
        await listValidator.validate(body, {abortEarly: false});

        const {username} = req.user;
        const {id} = req.params;

        const {
            list_name: name,
            list_subject: subject,
            questions,
            channels
        } = body;

        await List.findOneAndUpdate({
            _id: id,
            owner: username
        }, {
            $set: {
                name,
                subject,
                questions
            }
        });

        await Channel.update(
            {lists: id},
            {$pullAll: {lists: [id]}},
            {multi: true}
        );

        await Channel.update(
            {
                _id: {$in: channels}
            },
            {
                $push: {
                    lists: id
                }
            },
            {
                multi: true
            }
        );

        res.json({});
    } catch (e) {
        res.status(400).json(e);
    }
};

module.exports = {
    get,
    add,
    create,
    update,
    remove,
    save
};
