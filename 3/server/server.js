const express = require('express')
let app = express()
let path = require('path')

app.use('/', express.static(path.join(__dirname, './static')))

app.use('/', (req, res, next) => { 
    console.log('req.url', req.url)
    next()
}) 

app.listen(3000, () => { console.log('server is running on port 3000') })

