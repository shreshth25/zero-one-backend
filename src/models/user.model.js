import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 characters long'],
        maxLength: [50, 'Email must be at max 250 characters long'],
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'Name Should be 2 characters long'],
        maxLength: [50, 'Name must be at max 250 characters long'],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
})

userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10)
}

userSchema.methods.isValid = function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({ email: this.email, id: this._id }, config.JWT_SECRET, {
        expiresIn: '1d',
    })
}

const User = mongoose.model('user', userSchema)

export default User
