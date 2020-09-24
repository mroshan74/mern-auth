const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const userControllers = {}

userControllers.account = (req,res) => {
    const { username, email, role, _id} = req.user
    res.json({
        ok: true,
        username, 
        email, 
        role, 
        _id
    })
}

userControllers.update = (req,res) => {
    const { body, user } = req
    User.findOne({_id: user._id})
        .then(user => {
            if(body.username){
                user.username = body.username
            }
            if(body.password){
                user.password = body.password
            }
            user.save()
                .then(updatedUser => {
                    if(updatedUser){
                        const { _id , username, email, role } = updatedUser
                        return res.json({
                            ok: true,
                            user: {
                                _id , username, email, role
                            }
                        })
                    }
                    else {
                        res.status(400).json({ 
                            ok: false,
                            msg: 'User update failed'
                        })
                    }
                })
                .catch(err => {
                    res.status(502).json({ 
                        ok: false,
                        msg: 'User update failed',
                        err
                    })
                })
        })
        .catch(err => {
            res.status(502).json({ 
                ok: false,
                msg: 'User update failed',
                err
            })
        })
}

module.exports = userControllers