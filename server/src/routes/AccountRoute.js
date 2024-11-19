// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');

// Lấy thông tin tài khoản người dùng
router.get('/get-info', AuthenticationMiddleware, AccountController.getAccountInfo);
router.put('/set-info', AuthenticationMiddleware, AccountController.setAccountInfo);

module.exports = router;
