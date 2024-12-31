import mongoose from 'mongoose'
import config from './config.js'

const connectDB = async () => {
    try {
        await mongoose.connect(config.DATABASE_URL)
        console.log('Mongodb Connected Succesfully ✅')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB
