const express = require('express')
const app = express()
const port = process.env.PORT || 5990
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

if(process.env.NODE_ENV == 'development'){
    app.use(cors({origin: CLIENT_URL}))
}

app.use(morgan('dev'))
app.use(express.json())

const db = require('./config/database')
db()

const routes = require('./config/routes')
app.use('/api',routes)

app.listen(port, () => {
    console.log('Listening on PORT -->',port)
})