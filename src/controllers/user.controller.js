import { validationResult } from 'express-validator'
import * as userService from '../services/user.service.js'

const registerUserController = async (req, resp, next) => {
    try {
        const data = await userService.createUser(req.body)
        resp.status(201).json({ message: 'User Created Successfully', data })
    } catch (error) {
        console.log()
        next(error)
    }
}

const loginUserController = async (req, resp, next) => {
    try {
        const data = await userService.loginUser(req.body)
        resp.status(201).json({ message: 'Login Successfully', data })
    } catch (error) {
        console.log()
        next(error)
    }
}

const profileUserController = async (req, resp, next) => {
    try {
        const data = await userService.profileUser(req.user)
        resp.status(201).json({ message: 'Profile Fetched Successfully', data })
    } catch (error) {
        console.log()
        next(error)
    }
}

export { registerUserController, loginUserController, profileUserController }
