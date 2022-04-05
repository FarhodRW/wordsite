
import { Router } from 'express'
import { getQuizItemController, getQuizItemHistoryController } from '../../controller/quiz/quiz-item.controller';
import { verifyUserToken } from '../../middleware/userAuth';

const quizItemRouter = Router();

quizItemRouter.get('/history/:id', verifyUserToken, getQuizItemHistoryController)
quizItemRouter.get('/quiz/:id', verifyUserToken, getQuizItemController)


export default quizItemRouter;