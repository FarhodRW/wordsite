import express from 'express'
import { createUserController, deleteUserController, getUserProfileController, loginUserController, updateUserController } from '../controller/user.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/register', createUserController)
router.post('/login', loginUserController)
router.get('/profile', verifyUserToken, getUserProfileController)
router.put('/update', verifyUserToken, updateUserController)
router.put('/delete', verifyUserToken, deleteUserController)

export default router