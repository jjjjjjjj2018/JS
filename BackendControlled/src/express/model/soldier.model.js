
const mongoose = require('mongoose'),
    materializedPlugin = require('mongoose-materialized'),
    mongoosePaginate = require('mongoose-paginate-v2'),
    Schema = mongoose.Schema;

const soldierSchema = new Schema({
    avatar: { type: String },
    name: { type: String, text: true },
    sex: { type: String, text: true },
    email: { type: String , text: true},
    rank: { type: String , text: true},
    startDate: { type: String , text: true},
    numOfChildren:{type:Number}


}, { timestamps: true });

soldierSchema.plugin(materializedPlugin);
soldierSchema.plugin(mongoosePaginate);

const Soldier = mongoose.model('Soldier', soldierSchema);
module.exports = Soldier;