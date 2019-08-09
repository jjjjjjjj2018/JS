
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    gender: { type: String, trim: true },
    age: { type: Number, trim: true },
    password: { type: String, trim: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;