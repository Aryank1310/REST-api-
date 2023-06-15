const express = require('express');
const router = express.Router();
const UserController = require('../controllers/loginController');


// POST /api/login
router.post('/', UserController.loginUser);

module.exports = router;
