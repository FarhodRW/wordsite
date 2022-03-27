import express from 'express'
import { createWordController, deleteWordController, updateWordController } from '../controller/word.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/create', verifyUserToken, createWordController)
router.put('/update/:id', verifyUserToken, updateWordController)
router.delete('/delete/:id', verifyUserToken, deleteWordController)

export default router