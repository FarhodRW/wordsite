import express from 'express'
import { createUserController, loginUserController } from '../controller/user.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/', createUserController)
router.post('/login', loginUserController)

export default router