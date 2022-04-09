import { quizItemService } from "../../service/quiz/quiz-item.service";
import { Types } from 'mongoose'
import { success } from "../../common/response";
import { quizHistoryService } from "../../service/quiz/quiz-history.service";
import { QuizHistoryError } from "../../db/model/quiz/quiz-history.error";
import { QuizItemError } from "../../db/model/quiz/quiz-item/quiz-item.error";


export async function getQuizItemHistoryController(req, res, next) {
  try {
    let data
    const quizHistoryId = req.params.id;
    const quizHistory = await quizHistoryService.findById(quizHistoryId);

    if (!quizHistory.isFinished) {
      const quizes = await quizItemService.getQuizItemByQuizId(new Types.ObjectId(quizHistoryId));

      return success(res, {
        ...quizHistory.toObject(),
        quizes
      })
    }

    const quizes = await quizItemService.getQuizItemHistoryByQuizId(new Types.ObjectId(quizHistoryId));

    return success(res, {
      ...quizHistory.toObject(),
      quizes
    })

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

export async function answerQuizController(req, res, next) {
  try {

    const itemId = req.params.itemId;
    const wordId = req.params.wordId;

    const item = await quizItemService.getQuizItemByIdService(new Types.ObjectId(itemId));
    if (item.isAnswered) throw QuizItemError.AlreadyAnswered()

    const quizHistory = await quizHistoryService.findById(item.quizHistoryId)
    if (quizHistory.isFinished) throw QuizHistoryError.AlreadyFinished()


    if (item.wordId.toString() == wordId.toString())
      item.isCorrect = true;
    item.isAnswered = true;
    item.selectedId = wordId;
    await item.save();
    await quizHistoryService.updateTotal(item.quizHistoryId);

    return success(res, item)
  } catch (e) {
    next(e);
  }
}