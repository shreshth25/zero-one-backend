import * as adminService from '../services/admin.service.js'

const registerAdminController = async (req, resp, next) => {
    try {
        const data = await adminService.createAdmin(req.body)
        resp.status(201).json({ message: 'User Created Successfully', data })
    } catch (error) {
        console.log()
        next(error)
    }
}

const loginAdminController = async (req, resp, next) => {
    try {
        const data = await adminService.loginAdmin(req.body)
        resp.status(201).json({ message: 'Login Successfully', data })
    } catch (error) {
        console.log()
        next(error)
    }
}

const profileAdminController = async (req, resp, next) => {
    try {
        const data = await adminService.profileAdmin(req.user)
        resp.status(201).json({ message: 'Profile Fetched Successfully', data })
    } catch (error) {
        console.log()
        next(error)
    }
}

export { registerAdminController, loginAdminController, profileAdminController }
