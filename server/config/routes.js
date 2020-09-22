const express = require('express')
const router = express.Router()

//middlewares


//controllers
const authControllers = require('../app/controllers/authControllers')

//routes

// auth routes
router.post('/users/register', authControllers.register)

module.exports = router