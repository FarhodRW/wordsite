import express from 'express'
import { createQuizController } from '../../controller/quiz/quiz.controller'
import { createWordController, deleteWordController, getPublicWordsByPagingController, getWordsByPagingController, updateWordController } from '../../controller/word.controller'

import { verifyUserToken } from '../../middleware/userAuth'

const router = express.Router()

router.get('/create/:size', verifyUserToken, createQuizController)
router.get('/get/:id', verifyUserToken, createQuizController)


export default router