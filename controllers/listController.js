const List = require("../models/list");
const listValidator = require("../services/validations/list");

const get = async (req, res) => {
    const username = req.user ? req.user.username : "";
    const lists = await List.find({
        owner: username
    });
    res.render("lists", {
        lists,
        username,
        active: {
            lists: true
        }
    });
};

const add = async (req, res) => {
    const username = req.user ? req.user.username : "";
    res.render("add_list", {
        username,
        active: {
            lists: true
        }
    });
};

const create = async (req, res) => {
    const {
        body
    } = req;
    try {
        await listValidator.validate(body, {
            abortEarly: false
        });
        const {
            username
        } = req.user;
        const newestList = await List.findOne()
            .sort("-listCode")
            .exec();
        let code = null;

        if (!newestList) {
            code = 1000;
        } else {
            code = parseInt(newestList.listCode);
            code += 1;
        }

        const {
            list_name: name,
            list_subject: subject,
            questions,
        } = body;

        const list = new List({
            name,
            subject,
            questions,
            owner: username,
            listCode: `${code}`
        });

        await list.save();

        res.json({
            code
        });
    } catch (e) {
        res.status(400).json(e);
    }
};

const remove = async (req, res) => {
    const username = req.user.username;
    const listId = req.body.listId;
    const removed = await List.findOneAndRemove({
        owner: username,
        _id: listId
    });

    if (removed) {
        res.json({});
    } else {
        res.status(400).json({});
    }
};

const update = async (req, res) => {
    const {
        username
    } = req.user;
    const {
        id
    } = req.params;
    const list = await List.findOne({
        owner: username,
        _id: id
    });

    res.render("update_list", {
        list,
        username,
        active: {
            lists: true
        }
    });
};

const save = async (req, res) => {
    const {
        body
    } = req;
    try {
        await listValidator.validate(body, {
            abortEarly: false
        });

        const {
            username
        } = req.user;
        const {
            id
        } = req.params;

        const {
            list_name: name,
            list_subject: subject,
            questions,
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

        res.json({});
    } catch (e) {
        res.status(400).json(e);
    }
};

const filter = async (req, res) => {
    const {username} = req.user;
    const {search = ''} = req.body;

    const lists = await List.find({
            owner: username,
            $or: [
                {name: {"$regex": search, "$options": "i"}},
                {subject: {"$regex": search, "$options": "i"}},
                {listCode: {"$regex": search, "$options": "i"}},
            ]
        }
    );

    res.render("partials/list_table", {
        layout: false,
        lists
    });
};

module.exports = {
    get,
    add,
    create,
    update,
    remove,
    save,
    filter
};
