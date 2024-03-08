var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

let clients = 0

app.use(express.static("./public"))

io.on('connection', (socket) => {
  // console.log("a user connected")
  // console.log(socket)
  clients++
  socket.emit('clientChange', clients) // send to the client that just connected
  socket.broadcast.emit('clientChange', clients) // send to all clients except the one that just connected

  socket.on("chat", (msg) => {
    io.emit("message", msg) // send to all clients
  })

  socket.on("disconnect", () => {
    // console.log("a user disconnected")
    clients--
    socket.broadcast.emit('clientChange', clients) // send to all clients except the one that just disconnected
  })
  
})

const port = parseInt(process.env.PORT) || 8080;
server.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})

