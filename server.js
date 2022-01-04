const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')

// middlewares
app.use(express.static(path.join(__dirname, 'public')))


// routing
app.get('/', (req, res) => {
    res.sendFile('index.html')
})


// starting server
const port = process.env.PORT || 80
http.listen(port, () => {
    console.log(`started at port: ${port}`)
})

// socket
const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log('connected to web socket')

    // listen to message event
    socket.on('message', (msg) => {
        // broadcast msg to all connected users
        socket.broadcast.emit('message', msg)
    })
})