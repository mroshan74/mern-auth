const authControllers = {}
const User = require('../models/user')

authControllers.register = (req,res) => {
    const { body } = req
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