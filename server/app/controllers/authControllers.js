const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const User = require('../models/user')
const authControllers = {}

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
            else{
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
                            msg: 'Failed to register, please try again later',
                            err
                        })
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
                User.findOne({email})
                    .then(user => {
                        if(user){
                            return res.status(401).json({
                                ok: false,
                                msg: 'This account is verified or already exists, please register for a new account'
                            })
                        }
                        else{
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
                            ok: true,
                            token,
                            user: tokenData,
                            msg: 'Login Successful'
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

// forget/reset password

authControllers.forgotPassword = (req,res) => {
    const { email } = req.body

    User.findOne({email})
        .then(user => {
            if(user){
                const { username, email, _id } = user
                const token = jwt.sign({ username, email, _id },process.env.JWT_RESET_PASSWORD,{expiresIn: '10m'})
            
                const emailData = {
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: `Account reset link`,
                    html: `
                        <h1>Hi <span style="color:blue;">${user.username}</span></h1>
                        <p>Click the link below to reset the password </p>
                        <p>${process.env.CLIENT_URL}/users/auth/reset/${token}</p>
                        <hr/>
                        <p>This email contain sensitive information</p>
                    `
                }

                user.updateOne({ resetPasswordLink:token })
                    .then(passLink => {
                        sgMail.send(emailData)
                            .then(sent => {
                                console.log('register email sent',sent)
                                return res.json({
                                    ok: true,
                                    msg: `An email has been sent to ${email}, please reset the password by following the link`
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(422).json({
                                    ok:false,
                                    msg: 'Failed to register, please try again later',
                                    err
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(422).json({
                            ok:false,
                            msg: 'Failed to register, please try again later',
                            err
                        })
                    })
            }
            else{
                return res.status(400).json({
                    ok:false,
                    msg: 'The email is not registered for service',
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
}

authControllers.resetPassword = (req,res) => {
    const token = req.params.token
    const { newPassword } = req.body
    console.log(token)
    if(token){
        jwt.verify(token, process.env.JWT_RESET_PASSWORD, function(err,decoded){
            if(err){
                console.log(err,decoded)
                return res.status(401).json({
                    ok: false,
                    msg: 'Link expired. Register again'
                })
            }
            else {
                const { email } = decoded
                //console.log(decoded,'------------->decoded')
                //const {username,password,email} = jwt.decode(token)
                User.findOne({email})
                    .then(user => {
                        if(user){
                            if(user.resetPasswordLink != token){
                                return res.status(401).json({
                                    ok: false,
                                    msg: 'Invalid reset link or expired link'
                                })
                            }
                            else{
                                user.password = newPassword
                                user.resetPasswordLink = ''
                                user.save()
                                .then(user => {
                                    res.json({
                                        ok: true,
                                        msg: 'User password successfully updated',
                                        user: {
                                            username: user.username,
                                            email: user.email
                                        }
                                    })
                                })
                                .catch(err => {
                                    res.status(401).json({
                                        ok: false,
                                        msg: 'Failed to update user, please try again',
                                        err
                                    })
                                })
                            }
                        }
                        else{
                            return res.status(401).json({
                                ok: false,
                                msg: 'This email is not registered for service'
                            })
                        }
                    })
                    .catch(err => {
                        res.status(401).json({
                            ok: false,
                            msg: 'Failed to fetch user, please try again',
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

module.exports = authControllers