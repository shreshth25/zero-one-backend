import express from 'express'
import * as userController from '../controllers/user.controller.js'
import * as userValidators from '../validators/user.validators.js'
import validateRequest from '../middleware/validator.middleware.js'
const router = express()

router.post(
    '/register',
    userValidators.registerUserValidator,
    validateRequest,
    userController.registerUserController
)

router.post(
    '/login',
    userValidators.loginUserValidator,
    validateRequest,
    userController.loginUserController
)

router.get('/profile', userController.profileUserController)
export default router
