const { check } = require('express-validator')

exports.runRegisterCheck = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required'),
    check('email')
        .isEmail()
        .withMessage('Email should be valid'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password should be of minimum 6 characters')
]

exports.runLoginCheck = [
    check('email')
        .isEmail()
        .withMessage('Email should be valid'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password should be of minimum 6 characters')
]

exports.runUpdateCheck = [
    check('username')
        .optional({checkFalsy: true})
        .isLength({min: 4})
        .withMessage('Username should be of minimum 4 characters'),
        

    check('email')
        .optional({checkFalsy: true})
        .isEmail()
        .withMessage('Email should be valid'),
    
    check('password')
        .optional({checkFalsy: true})
        .isLength({min: 6})
        .withMessage('Password should be of minimum 6 characters')
]

exports.runResetCheck = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Email should be valid'),
]

exports.runNewPassCheck = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({min: 6})
        .withMessage('Password should be of minimum 6 characters')
]