const express = require('express')
const router = express.Router()
const {NewBookingController,BookingDeleteController,GetAllBookingController} = require('../controllers/booking.controller')

router.get('/get-all',GetAllBookingController)
router.post('/',NewBookingController)
router.delete('/delete/:id',BookingDeleteController)

module.exports = router