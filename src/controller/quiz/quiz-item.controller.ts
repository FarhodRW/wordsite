import { quizItemService } from "../../service/quiz/quiz-item.service";
import { Types } from 'mongoose'
import { success } from "../../common/response";
import { quizHistoryService } from "../../service/quiz/quiz-history.service";


export async function getQuizItemHistoryController(req, res, next) {
  try {

    const quizHistoryId = req.params.id;
    const quizHistory = await quizHistoryService.findById(quizHistoryId);

    if (quizHistory.finishingAt > new Date() && !quizHistory.finishedAt) {
      const items = await quizItemService.getQuizItemByQuizId(new Types.ObjectId(quizHistoryId));

      success(res, items)
    }

    const items = await quizItemService.getQuizItemHistoryByQuizId(new Types.ObjectId(quizHistoryId));

    success(res, items)

  } catch (e) {
    next(e)
  }
}

export async function getQuizItemController(req, res, next) {
  try {

    const quizHistoryId = req.params.id;

    const items = await quizItemService.getQuizItemByQuizId(new Types.ObjectId(quizHistoryId));

    success(res, items)

  } catch (e) {
    next(e)
  }
}