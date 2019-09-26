const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.addUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email exists'
                })
            } else {
                if(req.body.password.length >= 8) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            const user = new User({
                                _id: mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName
                            });
                            user.save()
                                .then(result => {
                                    console.log(result);
                                    res.status(201).json({
                                        message: 'User created'
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        message: 'User is not created. Something went wrong. Check the input fields'
                                    });
                                });
                        }
                    });
                } else {
                    return res.status(500).json({
                        message: 'Password must have at least 8 characters'
                    });
                }
                
            }
        })

}


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Email or password is incorrect'
                })
            }
            if(req.body.password.length >= 8) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Email or password is incorrect'
                        })
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                                userId: user._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "7d"
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        })
                    }
                })
            } else {
                return res.status(500).json({
                    message: 'Password must have at least 8 characters'
                })
            }
            
        })
}

exports.addToFavourites = (req, res, next) => {
    const userId = req.params.userId;
    const recipeId = req.body.recipeId;
    User.findOne({ _id: userId })
        .then(user => {
            user.recipes.push(recipeId);
            res.status(200).json({
                message: 'Recipe added to favourites',
                recipes: user.recipes
            })
            return user.save();
        })
        .catch(err => {
            res.status(404).json({
                message: 'User not found'
            })
        })
}
