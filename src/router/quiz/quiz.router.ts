import express from 'express'
import { createQuizController, getQuizHistoryPagingController } from '../../controller/quiz/quiz.controller'
import { createWordController, deleteWordController, getPublicWordsByPagingController, getWordsByPagingController, updateWordController } from '../../controller/word.controller'

import { verifyUserToken } from '../../middleware/userAuth'

const router = express.Router()

router.post('/create/:size', verifyUserToken, createQuizController)
router.post('/', verifyUserToken, getQuizHistoryPagingController)

export default router