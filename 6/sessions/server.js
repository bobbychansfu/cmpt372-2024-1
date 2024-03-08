const express = require('express')
const session = require('express-session')
const PORT = 3000
const app = express()

app.use(session({
    name: 'nsession',
    secret: 'secret_string',
    resave: false,
    saveUninitialized: false,
    maxAge: 1000*60*60, // 1 hour
}))

// body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// end point to send an HTML login form

app.get('/login', async(requ,resp) => {
    resp.send(`
        <h1>Login</h1>
        <form action="/login" method="post">
            <input type="text" name="username" placeholder="Enter your username" required>
            <input type="password" name="password" placeholder="Enter your password" required>
            <input type="submit" value="Login">
        </form>
    `)
})

app.post('/login', async(requ,resp) => {
    // database call for the body data
    const {username, password} = requ.body
    user = {username: username, password: password}
    if(username === 'user' && password === 'password'){
        requ.session.user = user
        resp.redirect('/protected_resource')    
    }
    else {
        resp.redirect('/login')
    }
})

app.get('/protected_resource', isLoggedIn, async(requ,resp) => {
    resp.send(`PORTECTED`)
})

function isLoggedIn(requ,resp,next){
    if(requ.session.user){
        next()
    }
    else {
        resp.redirect('/login')
    }
}

app.get('/logout', async(requ,resp)=>{
    // logout user
    requ.session.destroy()
    resp.redirect('/login')
})

app.listen(PORT, '0.0.0.0')
console.log(`Running on port ${PORT}`)