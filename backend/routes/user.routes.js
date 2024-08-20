const router = require('express').Router()
const userCtrl = require('../controllers/user.controller')
const { validationData } = require('../middleware/data.checker')





router.post('/register',validationData,userCtrl.register)


module.exports=router