import { redisClient } from '../config/redis.js'

const setRedis = async (key, value, expiryInSeconds = null) => {
    try {
        if (expiryInSeconds) {
            await redisClient.set(key, value, {
                EX: expiryInSeconds,
            })
        } else {
            await redisClient.set(key, value)
        }
        console.log(`Key "${key}" set successfully in Redis.`)
    } catch (err) {
        console.error(`Failed to set key "${key}" in Redis:`, err)
        throw err
    }
}

const getRedis = async (key) => {
    try {
        const value = await redisClient.get(key)
        console.log(`Retrieved value for key "${key}":`, value)
        return value
    } catch (err) {
        console.error(`Failed to get key "${key}" from Redis:`, err)
        throw err
    }
}

export { getRedis, setRedis }
