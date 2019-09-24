const Recipe = require('../models/recipe');
const mongoose = require('mongoose');

exports.getRecipes = (req, res, next) => {
    Recipe
        .find()
        .select('name description ingredients measure category image video _id')
        .then(docs => {
            const response = {
                count: docs.length,
                recipes: docs.map(doc => {
                    return {
                        name: doc.name,
                        description: doc.description,
                        ingredients: doc.ingredients,
                        measure: doc.measure,
                        category: doc.category ? doc.category : 'Uncategorized',
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/recipes/' + doc._id
                        }
                    }
                })
            }
            console.log(docs);
            res.status(200).json(response);
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
    recipe.save().then(doc => {
        console.log(doc);
        res.status(201).json({
            message: 'Recipe added successfully',
            createdRecipe: {
                name: doc.name,
                description: doc.description,
                ingredients: doc.ingredients,
                measure: doc.measure,
                category: doc.category ? doc.category : 'Uncategorized',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipes/' + doc._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.getRecipe = (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findById(id).then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipes/' + id
                }
            });
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

    Recipe.update({ _id: id }, { $set: updateOps })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Recipe updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipes/' + id
                }
            });
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
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: { name: 'String', description: 'String'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}
