import { body } from 'express-validator'

const registerAdminValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),

    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        .notEmpty()
        .withMessage('Email is required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),
]

const loginAdminValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        .notEmpty()
        .withMessage('Email is required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),
]

export { registerAdminValidator, loginAdminValidator }
