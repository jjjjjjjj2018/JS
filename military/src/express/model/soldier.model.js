
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const soldierSchema = new Schema({
    img: { type: String },
    name: { type: String },
    sex: { type: String },
    startDate: { type: Date },
    phone: { type: Number },
    rank: { type: String },
    email: { type: String }
}, { timestamps: true });

UserSchema.plugin(tree);
userSchema.plugin(mongoosePaginate);

const Soldier = mongoose.model('Soldier', soldierSchema);
module.exports = Soldier;