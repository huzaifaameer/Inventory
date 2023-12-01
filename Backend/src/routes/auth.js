const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')
const verifyToken = require('../middlewares/auth')



router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/verifyOtp', authController.verifyOtp)

module.exports = router