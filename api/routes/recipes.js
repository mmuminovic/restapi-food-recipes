const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const recipeController = require('../controllers/recipe');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../', '../', 'uploads') + '/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', recipeController.getRecipes);

router.post('/', upload.single('recipeImage'), recipeController.addRecipe);

router.get('/:recipeId', recipeController.getRecipe);

router.patch('/:recipeId', recipeController.editRecipe);

router.delete('/:recipeId', recipeController.deleteRecipe);


module.exports = router;