
const mongoose = require('mongoose'),
    materializedPlugin = require('mongoose-materialized'),
    mongoosePaginate = require('mongoose-paginate-v2'),
    Schema = mongoose.Schema;

const soldierSchema = new Schema({
    // img: { type: String },
    name: { type: String },
    sex: { type: String },
    /* startDate: { type: String },
     phone: { type: Number },
     rank: { type: String },
     email: { type: String }*/
    parent: { type: Schema.Types.ObjectId, ref: 'Soldier' }
}, { timestamps: true });

soldierSchema.plugin(tmaterializedPluginree);
soldierSchema.plugin(mongoosePaginate);

const Soldier = mongoose.model('Soldier', soldierSchema);
module.exports = Soldier;