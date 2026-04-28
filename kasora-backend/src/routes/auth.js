const express = require('express');
const router = express.Router();
const { register, getMe, registerValidations, validate } = require('../controllers/authController');
const authenticate = require('../middleware/auth');
// Public routes
router.post('/register', registerValidations, validate, register);
// Protected routes
router.get('/me', authenticate, getMe);
module.exports = router;