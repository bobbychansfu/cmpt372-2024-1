const express = require('express')
var app = express()
var port = 3000

var cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get('/', function(req,res){
    var cookie = req.cookies.random

    if(cookie === undefined){
        var randomNumber = Math.random().toString()
        res.cookie('random', randomNumber, {maxAge: 900000, httpOnly: true})
        console.log('cookie created successfully' + randomNumber)
    } else {
        console.log('cookie exists', cookie)
    }

    res.send('hello')
    
})

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})