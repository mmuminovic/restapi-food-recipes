const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const categoryController = require('../controllers/category');

router.get('/', categoryController.getCategories);

router.post('/', checkAuth, categoryController.addCategory);

router.patch('/:categoryId', checkAuth, categoryController.editCategory);

router.get('/:categoryId', categoryController.getCategory);

router.delete('/:categoryId', checkAuth, categoryController.deleteCategory);


module.exports = router;