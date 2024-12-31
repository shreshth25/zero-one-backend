import express from 'express'
import config from './config/config.js'
import http from 'http'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import errorHandler from './middleware/error.middlware.js'
import userRouter from './routes/user.route.js'
import adminRouter from './routes/admin.route.js'
import connectDB from './config/database.js'
import { connectRedis } from './config/redis.js'
import sendEmail from './services/ses.service.js'

const app = express()

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(morgan('dev'))
app.use(helmet())
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, resp) => {
    resp.status(200).json({ message: 'Welcome to Metaverse' })
})
app.use('/api/users', userRouter)
app.use('/api/admin/', adminRouter)

app.use(errorHandler)

const configApp = async () => {
    await connectDB()
    await connectRedis()
    // await sendEmail('start', 'Welcome', {}, ['shreshthbansal2505@gmail.com'])
    const server = http.createServer(app)

    server.listen(config.PORT, () => {
        console.log(`Server Is Up And Running ✅`)
    })
}

export default configApp
