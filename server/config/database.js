const mongoose = require('mongoose')

const configureDB = () => {
    let url = 'mongodb://localhost:27017/mern-auth-db'
    if (process.env.NODE_ENV === 'production'){
        url = process.env.CLOUD_DB
    }
    mongoose.connect(url,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false  
    })
        .then(()=>{console.log('connected to mern-auth-db...')})
        .catch((err) => console.log(err))
}

module.exports = configureDB