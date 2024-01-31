// npm modules
const express = require('express')
let app = express()
const serveIndex = require('serve-index')
// node modules
let path = require('path')

app.use('/', express.static(path.join(__dirname, './static')))

app.use('/', (req, res, next) => { 
    console.log('req.url', req.url)
    next()
}) 

app.use('/files', serveIndex(path.join(__dirname, './files'), {'icons': true}))

app.get('/people', (req, res) => {
    return res.json({ people: ['John', 'Jane', 'Joe'] })
})

app.listen(3000, () => { console.log('server is running on port 3000') })

