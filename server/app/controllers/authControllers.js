const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const authControllers = {}
const User = require('../models/user')

sgMail.setApiKey(process.env.SEND_GRID_SECRET_KEY)

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

        const token = jwt.sign(body,process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn: '10m'})
        
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: body.email,
            subject: `Account activation link`,
            html: `
                <h1>Hi <span style="color:blue;">${body.username}</span></h1>
                <p>Click the link below to activate the account </p>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr/>
                <p>This email contain sensitive information</p>
            `
        }

        sgMail.send(emailData)
            .then(sent => {
                console.log('register email sent',sent)
                return res.json({
                    ok: true,
                    msg: `Verification email sent to ${body.email}, please confirm the email to complete registration`
                })
            })
            .catch(err => {
                console.log(err)
                res.status(422).json({
                    ok:false,
                    msg: 'Failed to register, please try agin later',
                    err
                })
            })
}

authControllers.accountActivation = (req,res) => {
    const token = req.params.token
    console.log(token)
    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err,decoded){
            if(err){
                console.log(err,decoded)
                return res.status(401).json({
                    ok: false,
                    msg: 'Link expired. Register again'
                })
            }
            else {
                const {username,password,email} = decoded
                //console.log(decoded,'------------->decoded')
                //const {username,password,email} = jwt.decode(token)
                const user = new User({username,password,email})
                    user.save()
                    .then(user => {
                        res.json({
                            ok: true,
                            msg: 'User successfully registered',
                            user: {
                                username: user.username,
                                email: user.email
                            }
                        })
                    })
                    .catch(err => {
                        res.status(401).json({
                            ok: false,
                            msg: 'Failed to save user, please try again',
                            err
                        })
                    })
            }
        })
    }
    else{
        return res.status(403).json({
            ok: false,
            msg: 'Unauthorized',
        })
    }
}

authControllers.login = (req,res) => {
    const { email, password } = req.body
    User.findOne({email})
        .then(user => {
            if(user){
                bcryptjs.compare(password,user.password)
                .then(match => {
                    if(match){
                        const tokenData = {
                            username: user.username,
                            email: user.email,
                            _id: user._id,
                            role: user.role
                        }

                        const token = jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn: '1d'})
                        res.json({
                            token
                        })
                    }
                    else{
                        res.json({
                            ok: false,
                            msg: 'Invalid email/password'
                        })
                    }
                })
                .catch(err => {
                    res.status(400).json({
                        ok: false,
                        err
                    })
                })
            }
            else{
                res.json({
                    ok: false,
                    msg: 'Invalid email/password'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                err
            })
        })
}
module.exports = authControllers