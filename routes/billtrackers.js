const express = require('express')
const router = express.Router()
const billTrackerController = require('../controllers/billtrackers') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, billTrackerController.getBillTracker)

router.post('/createBillTracker', billTrackerController.createBillTracker)

router.put('/markComplete', billTrackerController.markComplete)

router.put('/markIncomplete', billTrackerController.markIncomplete)

router.delete('/deleteBillTracker', billTrackerController.deleteBillTracker)

module.exports = router