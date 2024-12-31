import { createClient } from 'redis'

const redisClient = createClient({
    url: 'redis://127.0.0.1:6379',
})

redisClient.on('connect', () => {
    console.log('Connected to Redis Successfully ✅')
})

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err)
})

const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
            console.log('Redis connection established. ✅')
        }
    } catch (err) {
        console.error('Failed to connect to Redis:', err)
        throw err
    }
}

export { redisClient, connectRedis }
