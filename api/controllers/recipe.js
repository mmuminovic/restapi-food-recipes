const Recipe = require('../models/recipe');
const mongoose = require('mongoose');


exports.getRecipes = (req, res, next) => {
    Recipe
        .find()
        // .select('name description ingredients measure category image video _id')
        .then(docs => {
            const response = {
                count: docs.length,
                recipes: docs.map(doc => {
                    return {
                        id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        ingredients: doc.ingredients,
                        measure: doc.measure,
                        category: doc.category ? doc.category : 'Uncategorized',
                        image: doc.image,
                        video: doc.video
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.getRecipe = (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findById(id).then(doc => {
        if (doc) {
            res.status(200).json({
                message: 'Recepe found',
                recipe: {
                    id: doc._id,
                    name: doc.name,
                    description: doc.description,
                    ingredients: doc.ingredients,
                    measure: doc.measure,
                    category: doc.category ? doc.category : 'Uncategorized',
                    image: doc.image,
                    video: doc.video
                }
            });
        } else {
            res.status(404).json({
                message: 'Recipe not found'
            });
        }
    }).catch(err => {
        res.status(404).json({
            message: 'Getting recipe failed'
        });
    });
}

exports.addRecipe = (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        measure: req.body.measure,
        category: req.body.category,
        image: req.file.path,
        video: req.body.video
    });
    recipe.save().then(doc => {
        res.status(201).json({
            message: 'Recipe added successfully',
            createdRecipe: {
                name: doc.name,
                description: doc.description,
                ingredients: doc.ingredients,
                measure: doc.measure,
                category: doc.category ? doc.category : 'Uncategorized',
                video: doc.video,
            }
        });
    }).catch(err => {
        res.status(500).json({ message: 'Something went wrong with adding new recipe'});
    });
};

exports.editRecipe = (req, res, next) => {
    const id = req.params.recipeId;
    const updateOps = {};
    for (let ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Recipe.update({ _id: id }, { $set: updateOps })
        .then(result => {
            res.status(200).json({
                message: 'Recipe updated'
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong with editing the recipe'});
        })
}
exports.deleteRecipe = (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.remove({ _id: id })
        .then(result => {
            res.status(200).json({
                message: 'Product deleted'
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Deleting failed. User url is not valid' });
        })
}


