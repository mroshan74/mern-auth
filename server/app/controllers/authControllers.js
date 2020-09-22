const authControllers = {}
const User = require('../models/user')

authControllers.register = (req,res) => {
    const { body } = req
    User.findOne({email: body.email})
        .then(user => {
            if(user){
                return res.status(422).json({
                    ok: false,
                    msg: 'Email already in use'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                msg: `Can't process request. Try again later`,
                err
            })
        })
    const user = new User(body)
        user.save()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = authControllers