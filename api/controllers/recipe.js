const Recipe = require('../models/recipe');
const mongoose = require('mongoose');

exports.getRecipes = (req, res, next) => {
    Recipe
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.addRecipe = (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        measure: req.body.measure,
        category: req.body.category,
        image: req.body.image,
        video: req.body.video
    });
    recipe.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Recipe added successfully',
            createdRecipe: recipe
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.getRecipe = (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findById(id).exec().then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'No valid entry found'
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    });
}
exports.editRecipe = (req, res, next) => {
    const id = req.params.recipeId;
    const updateOps = {};
    for (let ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Recipe.update({ _id: id }, { $set: updateOps }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}
exports.deleteRecipe = (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}
