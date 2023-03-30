const express = require('express')
const router = express.Router()
const {NewnoticeController,noticeDeleteController,GetAllnoticeController} = require('../controllers/notice.controller')

router.get('/get-all',GetAllnoticeController)
router.post('/',NewnoticeController)
router.delete('/delete/:id',noticeDeleteController)

module.exports = router