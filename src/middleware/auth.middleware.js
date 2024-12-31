import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const isVerifiedUser = async (req, resp, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error(
                'Authorization header is missing or malformed'
            )
            error.status = 401
            throw error
        }

        const token = authHeader.split(' ')[1]
        const decodedUser = jwt.verify(token, config.JWT_SECRET)

        req.userId = decodedUser.id

        next()
    } catch (error) {
        console.error(error)
        next(error)
    }
}

export default isVerifiedUser
