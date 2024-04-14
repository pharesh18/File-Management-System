const joi = require('joi');
const { verifyToken, validateRequest } = require("./functions");

const open_access_apis = [
    '/api/users/register', '/api/users/login', '/api/users/forgetpassword', '/api/users/otp'
];

const validateSchema = (req, res, next) => {
    if (open_access_apis.indexOf(req.url) > -1) {
        next();
        return true;
    }

    const schema = joi.object({
        _id: joi.string().required(),
        accesstoken: joi.string().required()
    });

    const headers = {
        _id: req.headers._id,
        accesstoken: req.headers.accesstoken
    }

    if (!validateRequest(headers, res, next, schema)) {
        return false;
    }
}

const checkAccess = (req, res, next) => {
    if (open_access_apis.indexOf(req.url) > -1) {
        next();
        return true;
    }
    if (verifyToken(req.headers._id, req.headers.accesstoken)) {
        next();
        return true;
    } else {
        res.send({ error: true, message: "ACCESS_DENIED_PLEASE_RELOGIN" });
        return false;
    }
}

module.exports = { validateSchema, checkAccess }