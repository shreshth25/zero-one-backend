import User from '../models/user.model.js'

const createUser = async (data) => {
    const { name, email, password } = data

    const hashPassword = await User.hashPassword(password)

    const alreadyRegisterd = await User.findOne({ email })

    if (alreadyRegisterd) {
        const error = new Error('User with this email already registered')
        error.status = 400
        throw error
    }
    const user = new User({
        name,
        email,
        password: hashPassword,
    })

    const savedUser = await user.save()

    const token = await savedUser.generateJWT()

    const response = {
        user: savedUser,
        token,
    }
    return response
}

const loginUser = async (data) => {
    const { email, password } = data

    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error('User with this email is not there')
        error.status = 400
        throw error
    }

    const isMatch = await user.isValid(password)
    if (!isMatch) {
        const error = new Error('Invalid email or password')
        error.status = 400
        throw error
    }

    const token = await user.generateJWT()

    const response = {
        token,
    }
    return response
}

const profileUser = async (data) => {
    const { userId } = data

    const user = await User.findById(userId)

    if (!user) {
        const error = new Error('User Not Exist')
        error.status = 400
        throw error
    }

    const response = {
        user,
    }
    return response
}

export { createUser, loginUser, profileUser }
