
const express = require('express')
const router = express.Router()
const { NewTripController, TripDeleteController, GetAllTripController, GetAllTripByIdController } = require('../controllers/trip.controller')

router.get('/get-all', GetAllTripController)
router.get('/get-trip/:id', GetAllTripByIdController)
router.post('/', NewTripController)
router.delete('/delete/:id', TripDeleteController)

module.exports = router