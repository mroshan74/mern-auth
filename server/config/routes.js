const express = require('express')
const router = express.Router()

//middlewares
const { runRegisterCheck, runLoginCheck  } = require('../app/middlewares/validators/runChecks')
const { runValidation } = require('../app/middlewares/validators/runValidation')

//controllers
const authControllers = require('../app/controllers/authControllers')

//routes

// auth routes
router.post('/users/register', runRegisterCheck, runValidation, authControllers.register)
router.post('/auth/activate/:token',authControllers.accountActivation)
router.post('/users/login', runLoginCheck, runValidation, authControllers.login)

module.exports = router