const express = require('express')
const { SignInController, SignUpController,VerifyController,ForgotPasswordController } = require('../controllers/authentication.controller')
const router = express.Router()
const { verifyToken } = require("../middlewares/verify-token.middelware")
const { checkDulplicateUsername } = require("../middlewares/duplicate-trip.middleware")

router.post('/sign-in',SignInController)
router.post('/sign-up',checkDulplicateUsername,SignUpController)
router.post('/forgotPassword',ForgotPasswordController)
router.post('/change-password',verifyToken,ForgotPasswordController)
router.get('/verify',verifyToken,VerifyController)

module.exports = router