import { Server } from 'socket.io'
import config from './config/config.js'

let io

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    })

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token

        if (!token) {
            return next(new Error('Authentication error: Token is required'))
        }

        try {
            const user = jwt.verify(token, config.JWT_SECRET)
            socket.user = user
            next()
        } catch (err) {
            return next(new Error('Authentication error: Invalid token'))
        }
    })

    io.on('connection', (socket) => {
        console.log(`🔥 New connection: ${socket.id}, User: ${socket.user?.id}`)

        socket.on('message', (data) => {
            console.log(`Received message from ${socket.user?.id}: ${data}`)
            io.emit('message', `Server received: ${data}`)
        })

        socket.on('disconnect', () => {
            console.log(`👋 User disconnected: ${socket.id}`)
        })
    })

    return io
}

export default initializeSocket
