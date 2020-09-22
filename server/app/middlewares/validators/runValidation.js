const { validationResult } = require('express-validator')

exports.runRegisterValidation = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            ok: false,
            msg: errors.array()[0].msg
        })
    }
    next()
}