const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    ingredients: String,
    measure: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    image: String,
    video: String
});

module.exports = mongoose.model('Recipe', recipeSchema);