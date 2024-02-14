// npm modules
const express = require('express')
let app = express()
const serveIndex = require('serve-index')
const upload = require('express-fileupload')
const cors = require('cors')
// node modules
let path = require('path')
let fs = require('fs')
let http = require('http')

// internal modules
const db = require('./models/db')

let port = 8080

// file upload
app.use(upload())

// cors
app.use(cors())

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

// EXAMPLES

/*
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
*/

// upload file
app.post('/upload', (req, res) => {
    console.log(req.files.myImage)
    // store the file into the server
    let file = req.files.myImage.data
    let filename = path.join(__dirname,req.files.myImage.name)
    // fs.writeFileSync(filename, file)
    db.helpers.uploadFile(filename, file)
})

app.get('/viewimg', async (req, res) => {
    var picture_obj = await db.helpers.getImage(1)
    res.end(picture_obj.pic)
        
})


// data
var people = []

// people API
app.get('/people-api/all', async (req, res) => {
    let p = await db.helpers.getPeople()
    res.json(p)
    // return res.json(people)
})

app.post('/people-api/add', async (req, res) => {
    console.log(req.body)
    let name = req.body.name
    let age = req.body.age
    let instructor = req.body.instructor

    await db.helpers.addPerson(name, age, instructor)
    res.redirect('/people-api/all')

    // people.push(req.body)
    // db connection
    // return res.json({ message: 'person added' })
})

app.delete('/people-api/delete/:id', async (req, res) => {
    let id = req.params.id

    await db.helpers.deleteById(id)
    res.redirect('/people-api/all')

    // people.filter(function(person) {
    //     return person.id !== id
    // })
    // return res.json({ message: `${id} person deleted` })
})

async function InitDB() {
    await db.helpers.init()
    const p = await db.helpers.getPeople()
    console.log(p)
    people = p
}

InitDB()
    .then(() => { 
        app.listen(port, () => 
            console.log(`server is running on port ${port}`) 
    ) 
    })
    .catch((err) => { console.log(err) })


