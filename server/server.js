const express = require('express')
const app = express()
const port = process.env.PORT || 5990
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
// const compression = require('compression')
// const path = require('path')

if(process.env.NODE_ENV == 'development'){
    app.use(cors({origin: process.env.CLIENT_URL}))
}

app.use(morgan('dev'))
app.use(express.json())

const db = require('./config/database')
db()

const routes = require('./config/routes')
app.use('/api',routes)

//deploy
// app.use(compression())
// app.use(express.static(path.join(__dirname, 'build')))

// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

app.listen(port, () => {
    console.log('Listening on PORT -->',port)
})