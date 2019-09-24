const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    image: String
});

module.exports = mongoose.model('Category', categorySchema);