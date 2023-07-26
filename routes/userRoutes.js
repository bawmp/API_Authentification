//Importations

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

//Définition des routes liées à l'utilisateur
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', authenticateToken, userController.logout);

module.exports = router;