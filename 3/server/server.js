// npm modules
const express = require('express')
let app = express()
const serveIndex = require('serve-index')
const upload = require('express-fileupload')
// node modules
let path = require('path')
let fs = require('fs')
let http = require('http')

// file upload
app.use(upload())

// parsing body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// static files
app.use('/', express.static(path.join(__dirname, './static'), { 'index': ['home.html'] }))
app.use('/', (req, res, next) => { 
    console.log('req.url', req.url)
    next()
}) 
app.use('/files', serveIndex(path.join(__dirname, './files'), {'icons': true}))

// templates
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
app.get('/homepage', (req, res) => {
    return res.render('homepage', { name: 'John' })
})
app.get('/db', (req, res) => {
    var data = { results: [ { name: 'John',age: 43 }, { name: 'Jane', age:33 }, { name: 'Joe',age:23 } ]}
    return res.render('db', data )
})

// https
app.get('/https', (req, res) => {
    http.get('http://worldtimeapi.org/api/timezone/Europe', (response) => {
        let data = ''
        response.on('data', (chunk) => {
            data += chunk
        })
        response.on('end', () => {
            return res.send(JSON.parse(data))
        })
    })
})

// upload file
app.post('/upload', (req, res) => {
    console.log(req.files.myImage)
    // store the file into the server
    let file = req.files.myImage.data
    let filename = path.join(__dirname,req.files.myImage.name)
    fs.writeFileSync(filename, file)
})

// data
var people = []

// APIs
app.get('/people-api/all', (req, res) => {
    return res.json(people)
})

app.post('/people-api/add', (req, res) => {
    console.log(req.body)
    people.push(req.body)
    // db connection
    return res.json({ message: 'person added' })
})

app.delete('/people-api/delete/:id', (req, res) => {
    let id = req.params.id
    people.filter(function(person) {
        return person.id !== id
    })
    return res.json({ message: `${id} person deleted` })
})

app.listen(3000, () => { console.log('server is running on port 3000') })

