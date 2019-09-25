const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', userController.addUser);

router.delete('/:userId', checkAuth, userController.deleteUser);

router.post('/:userId', checkAuth, userController.addToFavourites);

router.post('/login', userController.login);

module.exports = router;