const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');
const { editPhoneNumber } = require('../controllers/editController');

// Protected endpoint that requires authorization
router.put('/', verifyToken, editPhoneNumber);

module.exports = router;
