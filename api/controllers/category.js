const Category = require('../models/category');
const mongoose = require('mongoose');

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

}

exports.deleteCategory = (req, res, next) => {
    res.status(200).json({
        message: 'Category deleted',
        categoryId: req.params.categoryId
    })
}

exports.getCategories = (req, res, next) => {
    res.status(200).json({
        message: 'Category was fetched'
    })
}

exports.getCategory = (req, res, next) => {
    const id = req.params.categoryId;
    Category.findById(id).then(doc => {
        if(doc) {
            res.status(200).json(doc);
        }
        else {
            res.status(500).json({
                message: 'No valid entry found'
            })
        }
    })
    res.status(200).json({
        message: 'Category details',
        categoryId: req.params.categoryId
    })
}