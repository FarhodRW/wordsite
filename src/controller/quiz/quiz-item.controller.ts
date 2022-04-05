import { quizItemService } from "../../service/quiz/quiz-item.service";
import { Types } from 'mongoose'
import { success } from "../../common/response";


export async function getQuizItemController(req, res, next) {
  try {

    const quizHistoryId = req.params.id;

    const items = await quizItemService.getQuizItemHistoryByQuizId(new Types.ObjectId(quizHistoryId));

    success(res, items)

  } catch (e) {
    next(e)
  }
}