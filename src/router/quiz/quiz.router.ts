import express from 'express'
import { getQuizItemHistoryController } from '../../controller/quiz/quiz-item.controller'
import { createQuizController, getQuizHistoryByIdController, getQuizHistoryPagingController, updateQuizResultController } from '../../controller/quiz/quiz.controller'
import { createWordController, deleteWordController, getPublicWordsByPagingController, updateWordController } from '../../controller/word.controller'

import { verifyUserToken } from '../../middleware/userAuth'

const router = express.Router()

router.post('/create', verifyUserToken, createQuizController)
router.post('/', verifyUserToken, getQuizHistoryPagingController)
router.post('/finish/:id', verifyUserToken, updateQuizResultController)
router.get('/history/:id', verifyUserToken, getQuizItemHistoryController)


export default router