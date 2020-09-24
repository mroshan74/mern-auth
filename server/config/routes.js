const express = require('express')
const router = express.Router()

//middlewares
const { runRegisterCheck, runLoginCheck, runUpdateCheck } = require('../app/middlewares/validators/runChecks')
const { runValidation } = require('../app/middlewares/validators/runValidation')
const authenticateUser = require('../app/middlewares/auth/authentication')
const isAdmin = require('../app/middlewares/auth/isAdmin')

//controllers
const authControllers = require('../app/controllers/authControllers')
const userControllers = require('../app/controllers/userControllers')

//routes

// auth routes
router.post('/users/register', runRegisterCheck, runValidation, authControllers.register)
router.post('/auth/activate/:token',authControllers.accountActivation)
router.post('/users/login', runLoginCheck, runValidation, authControllers.login)

//user routes
router.get('/users/account/', authenticateUser, userControllers.account)
router.put('/users/account/update', authenticateUser, runUpdateCheck, runValidation, userControllers.update)

//test
router.put('/test', runUpdateCheck, runValidation, (req,res) => {
    res.json({
        msg: 'Done!!!!'
    })
})

module.exports = router