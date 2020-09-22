const express = require('express')
const router = express.Router()

//middlewares
const { runRegisterCheck } = require('../app/middlewares/validators/runChecks')
const { runRegisterValidation } = require('../app/middlewares/validators/runValidation')

//controllers
const authControllers = require('../app/controllers/authControllers')

//routes

// auth routes
router.post('/users/register', runRegisterCheck, runRegisterValidation, authControllers.register)

module.exports = router