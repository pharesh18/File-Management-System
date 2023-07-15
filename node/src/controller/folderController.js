const { folders } = require('../library/schema.js');
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
        folder_name: req.body.folder_name,
        unique_id,
        parent_id: req.body.parent_id ? req.body.parent_id : null,
        created_date: new Date(),
    }

    let folder = new folders(data);
    return await folder.save().then(async (result) => {
        if (result) {
            res.send({ error: false, message: 'success' });
        } else {
            res.send({ error: true, message: 'something_went_wrong' });
        }
    }).catch(error => {
        console.log(error);
        res.send({ error: true, message: 'something_broken' });
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


module.exports = { createFolder, getFolders }