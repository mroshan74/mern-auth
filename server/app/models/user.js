const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const isEmail = require('validator/lib/isEmail');

const Schema = mongoose.Schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
            validate:{ 
                validator: function(value){
                    return isEmail(value)
                },
                message: function(){
                    return 'invalid email format'
                }
            }
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    { timestamps: true }
)

userSchema.pre('save', function(next){
    bcryptjs.genSalt()
        .then(salt => {
            bcryptjs.hash(this.password,salt)
                .then(encrypted => {
                    this.password = encrypted
                    next()
                })
                .catch(err => {
                    return Promise.reject(err)
                })
        })
        .catch(err => {
            return Promise.reject(err)
        })
})

const User = mongoose.model('User', userSchema)
module.exports = User