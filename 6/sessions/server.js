const express = require('express')
const session = require('express-session')
const PORT = 3000
const app = express()


app.post('/login', async(requ,resp) => {
    
})

app.get('/protected_resource', async(requ,resp) => {
    resp.send(`PORTECTED`)
})

app.get('/logout', async(requ,resp)=>{
    requ.session.regenerate()
    resp.redirect('/login')
})

app.listen(PORT, '0.0.0.0')
console.log(`Running on port ${PORT}`)