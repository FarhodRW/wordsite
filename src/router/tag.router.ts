import express from 'express'
import { createTagController, deleteTagController, getTagsByPagingController, updateTagController } from '../controller/tag.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/create', verifyUserToken, createTagController)
router.post('/tags', verifyUserToken, getTagsByPagingController)
router.put('/update/:id', verifyUserToken, updateTagController)
router.delete('/delete/:id', verifyUserToken, deleteTagController)

export default router