const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const recipeController = require('../controllers/recipe');

const Recipe = require('../models/recipe');

router.get('/', recipeController.getRecipes);

router.post('/', recipeController.addRecipe);

router.get('/:recipeId', recipeController.getRecipe);

router.patch('/:recipeId', recipeController.editRecipe);

router.delete('/:recipeId', recipeController.deleteRecipe);


module.exports = router;