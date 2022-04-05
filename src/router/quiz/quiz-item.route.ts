
import { Router } from 'express'
import { getQuizItemController } from '../../controller/quiz/quiz-item.controller';
import { verifyUserToken } from '../../middleware/userAuth';

const quizItemRouter = Router();

quizItemRouter.get('/:id', verifyUserToken, getQuizItemController)


export default quizItemRouter;