import express from 'express'
import { answerQuizController, getQuizItemHistoryController } from '../../controller/quiz/quiz-item.controller'
import { createQuizController, getMaxQuestionsController, getQuizHistoryByIdController, getQuizHistoryPagingController, updateQuizResultController } from '../../controller/quiz/quiz.controller'
import { createWordController, deleteWordController, getPublicWordsByPagingController, updateWordController } from '../../controller/word.controller'

import { verifyUserToken } from '../../middleware/userAuth'

const router = express.Router()

router.post('/', verifyUserToken, createQuizController)
router.post('/maximum-questions', verifyUserToken, getMaxQuestionsController)
router.get('/', verifyUserToken, getQuizHistoryPagingController)
router.post('/finish/:id', verifyUserToken, updateQuizResultController)
router.get('/:id', verifyUserToken, getQuizItemHistoryController)
router.post('/answer/:itemId/:wordId', verifyUserToken, answerQuizController)


export default router