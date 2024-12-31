import express from 'express'
import * as adminController from '../controllers/admin.controller.js'
import * as adminValidators from '../validators/admin.validators.js'
import validateRequest from '../middleware/validator.middleware.js'
const router = express()

router.post(
    '/register',
    adminValidators.registerAdminValidator,
    validateRequest,
    adminController.registerAdminController
)

router.post(
    '/login',
    adminValidators.loginAdminValidator,
    validateRequest,
    adminController.loginAdminController
)

router.get('/profile', adminController.profileAdminController)
export default router
