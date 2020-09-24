const User = require('../../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = (req,res,next) => {
    if(req.header('x-auth')){
        const token = req.header('x-auth')
        let tokenData
        try{
            tokenData = jwt.verify(token, process.env.JWT_SECRET)
            User.findById(tokenData._id)
                .then(user => {
                    req.user = user
                    next()
                })
                .catch(err => {
                    res.status(500).json({
                        ok: false,
                        err 
                    })
                })
        } catch(err) {
            res.status(400).json({
                ok: false,
                errors: err.message 
            })
        }
    }else {
        res.status(400).json({ 
            ok: false,
            errors: 'token must be provided'
        })
    }
}

module.exports = authenticateUser