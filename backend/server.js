const express = require('express')
const app = express()
require('dotenv').config()
const connectToMongo = require('./helpers/db.connect')
app.use(express.json())

const port = process.env.PORT || 8000

app.use('/user',require('./routes/user.routes'))

connectToMongo()
app.listen(port,(err)=>{
    err? console.log('err', err) : console.log(`server is running on port : ${port}`)
})