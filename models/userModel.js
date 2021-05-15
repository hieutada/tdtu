const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    googleID: {type: String},
    displayName: {type: String},
    username : {type: String, required: true, trim: true},
    password: {type: String},
    profilePic: {type: String},
    role: {type: String},
    grade: {type: String},
    major: {type: String}
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)

module.exports = User