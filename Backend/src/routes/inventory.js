const express = require('express')
const router = express.Router()

const inventoryController = require('../controllers/inventory')
const verifyToken = require('../middlewares/auth')

router.use(verifyToken)

router.post('/', inventoryController.addRecord)
router.put('/', inventoryController.updateRecord)
router.delete('/', inventoryController.removeRecord)
router.get('/', inventoryController.fetchRecord)

module.exports = router