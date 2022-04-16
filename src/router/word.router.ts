import express from 'express'
import { createWordController, deleteWordController, getPublicWordsByPagingController, getWordsByPagingController, updateWordController } from '../controller/word.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/', verifyUserToken, createWordController)
router.put('/:id', verifyUserToken, updateWordController)
router.get('/my-words', verifyUserToken, getWordsByPagingController)
router.get('/', getPublicWordsByPagingController)
router.delete('/:id', verifyUserToken, deleteWordController)

export default router