const express = require('express')
const router = express.Router()

const reportController = require('../controllers/report')
const verifyToken = require('../middlewares/auth')

router.use(verifyToken)

router.get('/', reportController.generateReport)
router.post('/', reportController.reportReceiver)

module.exports = router