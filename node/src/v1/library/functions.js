// const { users } = require('../library/schema.js');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const crypto = require('crypto');
const { folders } = require('../library/schema.js');

const generateOtp = (length = 4) => {
    let otp = String(Math.ceil(Math.random() * 10000));
    return otp.length === length ? otp : generateOtp();
}

const sendEmail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.OTP_MAIL, pass: process.env.OTP_PASSWORD, }
    });
    let mailOptions = { from: process.env.OTP_MAIL, to, subject, text }
    return transporter.sendMail(mailOptions);
}

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(process.env.SALT);
    return await bcrypt.hash(password, salt);
}

const generateToken = (_id) => {
    // console.log(sign({ _id }, process.env.JWTKEY));
    return sign({ _id }, process.env.JWTKEY);
}

const verifyToken = (_id, token) => {
    let result = false;
    verify(token, process.env.JWTKEY, (err, decoded) => {
        if (err) return false;
        if (decoded._id === _id)
            result = true;
    })
    return result;
}

const validateRequest = (reqSchema, res, next, schema) => {
    const option = {
        abortEarly: true,
        allowUnknown: true,
        stripUnknown: false
    };

    const { error, value } = schema.validate(reqSchema, option);
    if (error) {
        res.send({ error: true, message: error.message });
        return false;
    } else {
        reqSchema = value;
        next();
    }
}

const generateUniqueString = async (length = 16) => {
    const unique_id = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    console.log(unique_id);
    if (!unique_id.length === length) {
        generateUniqueString();
    }
    const data = await folders.find({ unique_id });
    if (!data.length > 0) {
        return unique_id;
    } else {
        generateUniqueString();
    }
}


// const deleteUsers = async () => {
//     await users.deleteMany();
// }

module.exports = { generateOtp, sendEmail, encryptPassword, verifyToken, generateToken, validateRequest, generateUniqueString }