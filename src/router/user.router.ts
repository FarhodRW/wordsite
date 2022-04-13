import express from 'express'
import { createUserController, deleteUserController, getUserProfileController, loginUserController, updateUserController } from '../controller/user.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/register', createUserController)
router.post('/login', loginUserController)
router.get('/', verifyUserToken, getUserProfileController)
router.put('/', verifyUserToken, updateUserController)
router.delete('/', verifyUserToken, deleteUserController)

export default router