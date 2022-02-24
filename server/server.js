// const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const router = require('./router')
const {addUser,removeUser,getUser,getAllUsers} = require('./users.js')
const room = 'Live Chat'
const cors = require('cors')
 
app.use(cors())

// const socketio = require('socket.io')                ----earlier
// const io = socketio(server)


io.on('connection',(socket)=>{
    console.log('a new user connected')
    
    socket.on('join',({name})=>{
        
        const user = addUser({id:socket.id,name})
        console.log('use:',user)

        if(user.error) {
            let err = user.error
            console.log(user.error)
            socket.emit('err',{err})
            return user.error
        }
        
         socket.emit('message',{user:'admin',text:`Hi ${user.name}, Welcome to ${room}`})
         socket.broadcast.to(room).emit('message',{user:'admin',text:`${user.name} has joined !!`})

         socket.join(room)

        
    })

    socket.on('sendMessage', ({message})=>{
        
        const user =  getUser(socket.id)
         io.to(room).emit('message',{user:user.name,text:message})
    }) 

    socket.on('disconnect',()=>{
        console.log('user disconnected')
        const user = removeUser(socket.id)
        console.log('remove',user)
        socket.broadcast.to(room).emit('message',{user:'admin',text:`${user.name} has left `})
    })
})

app.use(router)                          //middleware

server.listen('5000',()=>{
    console.log('listening on 5000...')
})