import express from 'express'
import { getQuizController } from '../controller/quiz.controller'
import { createWordController, deleteWordController, getPublicWordsByPagingController, getWordsByPagingController, updateWordController } from '../controller/word.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.get('/:size', verifyUserToken, getQuizController)


export default router