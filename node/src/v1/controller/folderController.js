const { folders, documents } = require('../library/schema.js');
const crypto = require('crypto');

const createFolder = async (req, res) => {
    const unique_id = crypto.randomBytes(Math.ceil(process.env.UNIQUE_ID_LENGTH / 2)).toString('hex').slice(0, process.env.UNIQUE_ID_LENGTH);

    if (!unique_id.length === process.env.UNIQUE_ID_LENGTH) {
        createFolder(req, res);
    }
    const response = await folders.find({ unique_id });
    if (response.length > 0) {
        createFolder(req, res);
    }

    const data = {
        user_id: req.headers._id,
        folder_name: req.body.folder_name.trim(),
        unique_id,
        parent_id: req.body.parent_id ? req.body.parent_id : null,
        created_date: new Date(),
    }

    let folder = new folders(data);

    return await folders.find({ user_id: req.headers._id, parent_id: data.parent_id, folder_name: { $regex: req.body.folder_name.trim(), $options: 'i' } }).then(async (response) => {
        if (response.length > 0) {
            res.send({ error: true, message: "Folder with the same name already exists, try another!" })
        } else {
            await folder.save().then(async (result) => {
                if (result) {
                    res.send({ error: false, message: 'folder created successfully!' });
                } else {
                    res.send({ error: true, message: 'something_went_wrong' });
                }
            }).catch(error => {
                console.log(error);
                res.send({ error: true, message: 'something_broken' });
            });
        }
    }).catch(error => {
        console.log(error);
        res.send({ error: true, message: "something_broken" });
    });
};


const getFolders = async (req, res) => {
    await folders.find({ user_id: req.headers._id, parent_id: req.body.parent_id }).then((data) => {
        if (data) {
            res.send({ error: false, message: 'success', data: data });
        } else {
            res.send({ error: false, message: 'NO FOLDERS FOUND', data: {} });
        }
    }).catch((error) => {
        console.log(error);
        res.send({ errro: true, message: 'Something_broken' });
    });
};

const deleteFolder = async (req, res) => {
    return await folders.find({ user_id: req.headers._id, parent_id: req.body.unique_id }).then(async (data) => {
        await documents.find({ user_id: req.headers._id, parent_id: req.body.unique_id, is_deleted: false }).then(async (result) => {
            if (data.length > 0 || result.length > 0) {
                res.send({ error: true, message: "Non empty folder can not be deleted!" });
            } else {
                await documents.deleteMany({ user_id: req.headers._id, parent_id: req.body.unique_id, is_deleted: true });
                await folders.findOneAndDelete({ user_id: req.headers._id, unique_id: req.body.unique_id });
                res.send({ error: false, message: "Folder deleted!" });
            }
        }).catch((err) => {
            console.log(err);
            res.send({ error: true, message: "something_broken" });
        });
    }).catch((err) => {
        console.log(err);
        res.send({ error: true, message: "something_broken" });
    });
}

module.exports = { createFolder, getFolders, deleteFolder }