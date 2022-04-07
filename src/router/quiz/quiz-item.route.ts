
import { Router } from 'express'
import { answerQuizController, getQuizItemController, getQuizItemHistoryController } from '../../controller/quiz/quiz-item.controller';
import { verifyUserToken } from '../../middleware/userAuth';

const quizItemRouter = Router();

quizItemRouter.get('/history/:id', verifyUserToken, getQuizItemHistoryController)
quizItemRouter.get('/quiz/:id', verifyUserToken, getQuizItemController)
quizItemRouter.get('/quiz/answer/:itemId/:wordId', verifyUserToken, answerQuizController)


export default quizItemRouter;