const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
// const { deleteUsers } = require('./functions');

const schema = {};

schema.users = Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
    },
    path: {
        type: String,
    },
    otp: {
        type: Number,
    },
    is_verified: {
        type: Boolean,
        required: true,
    },
    created_date: {
        type: Date,
        required: true,
    },
});

schema.documents = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    originalname: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    parent_id: {
        type: String,
    },
    created_date: {
        type: Date,
        required: true,
    }
});

schema.folders = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    folder_name: {
        type: String,
        required: true,
    },
    unique_id: {
        type: String,
        required: true,
        unique: true,
    },
    parent_id: {
        type: String,
    },
    created_date: {
        type: Date,
        required: true,
    }
});

schema.users.plugin(uniqueValidator);   // validator for unique email
schema.folders.plugin(uniqueValidator);   // validator for unique folder id

schema.users.methods.matchPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};

schema.users.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const users = model('users', schema.users);
const documents = model('documents', schema.documents);
const folders = model('folders', schema.folders);

// deleteUsers();
module.exports = { users, documents, folders };