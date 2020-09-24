const User = require('../models/user')
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
    User.findOneAndUpdate({_id: user._id}, body, {
        new: true,
        select: 'username email role',
    })
        .then(user => {
            if(user){
                return res.json({
                    ok: true,
                    user
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
}

module.exports = userControllers