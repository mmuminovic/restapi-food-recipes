const Category = require('../models/category');
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

exports.getCategories = (req, res, next) => {
    Category
        .find()
        .then(docs => {
            res.status(200).json({
                message: 'Categories',
                categories: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.getCategory = (req, res, next) => {
    const id = req.params.categoryId;
    Category.findById(id).then(doc => {
        if (doc) {
            return res.status(200).json({
                message: 'Category details',
                category: doc
            });
        }
        else {
            return res.status(500).json({
                message: 'No valid entry found'
            })
        }
    })
}

exports.addCategory = (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.body.image
    });
    category.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

exports.editCategory = (req, res, next) => {
    const id = req.params.categoryId;
    const updateOps = {};
    for (let ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Category.update({ _id: id }, { $set: updateOps })
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

exports.deleteCategory = (req, res, next) => {
    const id = req.params.categoryId;
    
    // Recipe.update({ category: id }, {$set: {category: 'Uncategorized'}})
    // .then(recipes => {
    //     console.log(recipes);
    // })
    // .catch(err => {
    //     res.status(404).json({
    //         message: 'No items found'
    //     })
    // })
    
    Category.remove({ _id: id })
        .then(result => {
            res.status(200).json({
                message: 'It has deleted successfully'
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })

}

