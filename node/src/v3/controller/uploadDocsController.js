const nodemailer = require('nodemailer');
// const { users } = require('../library/schema.js');
const joi = require('joi');
// const cloudinary = require('cloudinary').v2;
const { documents } = require('../library/schema.js');
const { validateRequest } = require('../library/functions.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// const https = require('https');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/documents');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const validateUploadDocs = (req, res, next) => {
    const fileSchema = joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().required()
    });


    for (const file of req.files) {
        const { error } = fileSchema.validate(file);
        if (error) {
            return res.send({ error: true, message: 'Invalid file(s) uploaded' });
        }
    }

    next();

    // console.log(req.files);
    // const fileValidationSchema = joi.object({
    //     files: joi.array().items(
    //         joi.object({
    //             fieldname: joi.string().required(),
    //             originalname: joi.string().required(),
    //             encoding: joi.string().required(),
    //             mimetype: joi.string().required(),
    //             size: joi.number().required(),
    //         })).min(1).required(),
    // });

    // if (!validateRequest(req.files, res, next, fileValidationSchema)) {
    //     return false;
    // }
}

const uploadDocs = async (req, res) => {
    try {
        for (const file of req.files) {
            const data = {
                user_id: req.headers._id,
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                parent_id: req.body.parent_id ? req.body.parent_id : null,
                is_deleted: false,
                created_date: new Date(),
            }
            const document = new documents(data);
            await document.save();
        }
        return res.send({ error: false, message: 'uploaded successfully' });
    } catch (error) {
        console.log(error);
        return res.send({ error: true, message: 'Something_broken' });
    }
}

const getDocument = async (req, res) => {
    let query = {};
    if (req.body.searchInput) {
        query = { user_id: req.headers._id, parent_id: req.body.parent_id, is_deleted: false, originalname: { $regex: req.body.searchInput, $options: 'i' } }
    } else {
        query = { user_id: req.headers._id, parent_id: req.body.parent_id, is_deleted: false }
    }
    await documents.find(query).then((data) => {
        if (data) {
            res.send({ error: false, message: 'success', data: data });
        } else {
            res.send({ error: false, message: 'NO FILES FOUND', data: {} });
        }
    }).catch((error) => {
        console.log(error);
        res.send({ errro: true, message: 'Something_broken' });
    });
}

const getBin = async (req, res) => {
    let query = {};
    if (req.body.searchInput) {
        query = { user_id: req.headers._id, is_deleted: true, originalname: { $regex: req.body.searchInput, $options: 'i' } }
    } else {
        query = { user_id: req.headers._id, is_deleted: true }
    }
    await documents.find(query).then((data) => {
        if (data) {
            res.send({ error: false, message: 'success', data: data });
        } else {
            res.send({ error: false, message: 'NO FILES FOUND', data: {} });
        }
    }).catch((error) => {
        console.log(error);
        res.send({ errro: true, message: 'Something_broken' });
    });
}

const downloadFile = async (req, res) => {
    try {
        const fileName = req.body.filename;
        const filePath = path.join('public', 'documents', fileName);

        const downloadPath = path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, 'Downloads', req.body.originalname);

        const fileStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(downloadPath);

        await fileStream.pipe(writeStream);
        res.send({ error: false, message: 'File Downloaded' });
    } catch (err) {
        console.log(err);
        res.send({ errro: true, message: "something broken" });
    }
}

const deleteFile = async (req, res) => {
    return await documents.findOneAndUpdate({ user_id: req.headers._id, filename: req.body.filename }, { is_deleted: true }).then((data) => {
        if (data) {
            res.send({ error: false, message: "File deleted" });
        } else {
            res.send({ error: true, message: "File Not Found" });
        }
    }).catch(error => {
        console.log(error);
        res.send({ error: true, message: "Something_broken" });
    });
}

const restoreFile = async (req, res) => {
    return await documents.findOneAndUpdate({ user_id: req.headers._id, filename: req.body.filename }, { is_deleted: false }).then((data) => {
        if (data) {
            res.send({ error: false, message: "File restored" });
        } else {
            res.send({ error: true, message: "File Not Found" });
        }
    }).catch(error => {
        console.log(error);
        res.send({ error: true, message: "Something_broken" });
    });
}

const restoreAll = async (req, res) => {
    return await documents.updateMany({ user_id: req.headers._id, is_deleted: true }, { is_deleted: false }).then((data) => {
        if (data) {
            res.send({ error: false, message: "All files restored" });
        } else {
            res.send({ error: true, message: "File Not Found" });
        }
    }).catch(error => {
        console.log(error);
        res.send({ error: true, message: "Something_broken" });
    });
}


const deletePermanent = async (req, res) => {
    return await documents.findOneAndDelete({ user_id: req.headers._id, filename: req.body.filename, is_deleted: true }).then((data) => {
        if (data) {
            res.send({ error: false, message: "File permanently deleted" });
        } else {
            res.send({ error: true, message: "File Not Found" });
        }
    }).catch(error => {
        console.log(error);
        res.send({ error: true, message: "Something_broken" });
    });
}

const deleteAllPermanent = async (req, res) => {
    return await documents.deleteMany({ user_id: req.headers._id, is_deleted: true }).then((data) => {
        if (data) {
            res.send({ error: false, message: "All files permanently deleted" });
        } else {
            res.send({ error: true, message: "File Not Found" });
        }
    }).catch(error => {
        console.log(error);
        res.send({ error: true, message: "Something_broken" });
    });
}

const recentData = async (req, res) => {
    let lastWeekQuery = {};
    let lastMonthQuery = {};
    let oldDataQuery = {};
    try {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        if (req.body.searchInput) {
            lastWeekQuery = { user_id: req.headers._id, is_deleted: false, originalname: { $regex: req.body.searchInput, $options: 'i' }, created_date: { $gte: oneWeekAgo, $lt: now } };
            lastMonthQuery = { user_id: req.headers._id, is_deleted: false, originalname: { $regex: req.body.searchInput, $options: 'i' }, created_date: { $lt: oneWeekAgo, $gte: oneMonthAgo } };
            oldDataQuery = { user_id: req.headers._id, is_deleted: false, originalname: { $regex: req.body.searchInput, $options: 'i' }, created_date: { $lt: oneMonthAgo } };
        } else {
            lastWeekQuery = { user_id: req.headers._id, is_deleted: false, created_date: { $gte: oneWeekAgo, $lt: now } };
            lastMonthQuery = { user_id: req.headers._id, is_deleted: false, created_date: { $lt: oneWeekAgo, $gte: oneMonthAgo } };
            oldDataQuery = { user_id: req.headers._id, is_deleted: false, created_date: { $lt: oneMonthAgo } };
        }

        const lastWeek = await documents.find(lastWeekQuery);
        const lastMonth = await documents.find(lastMonthQuery);
        const oldData = await documents.find(oldDataQuery);

        res.send({ error: false, message: 'success', data: { lastWeek, lastMonth, oldData } });
    } catch (error) {
        console.log(error);
        res.send({ error: true, message: "something_broken" });
    }
}

const shareDocument = async (req, res) => {
    // Configure nodemailer transporter
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: { user: process.env.OTP_MAIL, pass: process.env.OTP_PASSWORD, }
    // });

    // try {
    //     const { from, to, subject, text, fname } = req.body;

    //     console.log(req.body);
    //     // Compose email options
    //     const mailOptions = {
    //         from: from,
    //         to: to,
    //         subject,
    //         text,
    //         attachments: [
    //             {
    //                 filename: fname, // Replace with your file name
    //                 path: `public/documents/${fname}`, // Replace with the path to your file
    //             },
    //         ],
    //     };

    //     // Send the email
    //     await transporter.sendMail(mailOptions);

    // Send response
    // const gmailUrl = 'https://github.com'; // Replace with the Gmail URL or any other desired URL

    // Redirect the user to the Gmail URL
    // res.redirect(gmailUrl);
    res.send({ error: false });
    // res.send({ error: false, message: 'Email sent successfully' });
    // } catch (error) {
    //     console.error(error);
    //     res.send({ error: true, message: 'Something went wrong' });
    // }
}


module.exports = {
    upload,
    validateUploadDocs,
    uploadDocs,
    getDocument,
    shareDocument,
    downloadFile,
    deleteFile,
    getBin,
    restoreFile,
    deletePermanent,
    deleteAllPermanent,
    restoreAll,
    recentData
};

// cloudinary.config({
    //     cloud_name: process.env.CLOUDINARY_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET,
    //     secure: true

    // });

    // console.log(req.file);
    // res.status(400).send({ error: false, message: 'success' });
    // await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' }, async (error, result) => {
    //     if (result) {
    //         const data = {
    //             user_id: req.headers._id,
    //             doc: result.secure_url,
    //             public_id: result.public_id,
    //             created_date: new Date()
    //         };

    //         const document = new documents(data);
    //         await document.save();
    //         console.log(document);
    //         return res.status(200).send({ error: false, message: 'uploaded successfully' });
    //     } else {
    //         return res.status(400).send({ error: true, message: 'something_broken' })
    //     }
    // }).catch(error => {
    //     console.log(error);
    //     return res.status(401).send({ error: true, message: 'something_broken' });
    // });
    // req.files.files.forEach(async (file) => {
    //     console.log(file);
    //     await cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
    //         if (result) {
    //             const data = {
    //                 user_id: req.headers._id,
    //                 doc: result.secure_url,
    //                 public_id: result.public_id,
    //                 created_at: Date.now()
    //             };

    //             const document = new documents(data);
    //             await document.save();
    //             console.log(document);
    //         }
    //         if (error) {
    //             return res.status(400).send({ error: true, message: 'something_broken' })
    //         }
    //     }).catch(error => {
    //         console.log(error);
    //         return res.status(400).send({ error: true, message: 'something_broken' });
    //     })
    // });