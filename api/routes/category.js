const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

router.get('/', categoryController.getCategories);

router.post('/', categoryController.addCategory);

router.patch('/:categoryId', categoryController.editCategory);

router.get('/:categoryId', categoryController.getCategory);

router.delete('/:categoryId', categoryController.deleteCategory);


module.exports = router;