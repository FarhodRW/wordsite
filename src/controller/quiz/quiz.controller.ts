import { success } from "../../common/response";
import { validateIt } from "../../common/validation";
import { QuizDtoGroup, QuizHistoryGetDto } from "../../db/dto/quiz-history.dto";
import { QuizItemDto, QuizItemDtoGroup } from "../../db/dto/quizItem.dto";
import { QuizHistoryError } from "../../db/model/quiz/quiz-history.error";
import { QuizHistory, QuizHistoryModel } from "../../db/model/quiz/quiz-history.model";
import { QuizItemModel } from "../../db/model/quiz/quiz-item/quiz-item.model";
import { WordModel } from "../../db/model/word/word.model";
import { quizHistoryService } from "../../service/quiz/quiz-history.service";
import { quizItemService } from "../../service/quiz/quiz-item.service";

export async function createQuizController(req, res, next) {
  try {
    const size = req.params.size
    const createdBy = req.user._id
    const questions = await WordModel.aggregate([{ $match: { createdBy: createdBy } }, { $sample: { size: +size } }, { $project: { _id: 1, name: 1, defination: 1 } }])
    if (!questions.length) throw QuizHistoryError.NotEnoughWord(size)
    console.log(questions)
    const quizHistoryDto: QuizHistory = {
      createdBy,
      timeLimit: +size * 60,
      totalQuestions: +size,
      finishingAt: new Date((new Date()).setSeconds(new Date().getSeconds() + size * 60))
    }
    const quizHistory = await quizHistoryService.create(quizHistoryDto);

    for (const question of questions) {
      const variants = await WordModel.aggregate([{ $sample: { size: 4 } }])
      let options = [];
      let ansIndex = Math.floor(Math.random() * 4);

      variants.forEach((item, index) => {
        if (index == ansIndex) {
          options.push({
            name: question.defination,
            _id: question._id,
            wordId: question._id,
            isAnswer: true
          })
        }
        if (item._id.toString() !== question._id.toString() && options.length < 4

        )
          options.push({
            name: item.defination,
            wordId: item._id,
            _id: item._id
          })
      })

      question.variants = options;
      question.wordId = question._id;
      question.quizHistoryId = quizHistory._id;
      delete question._id;
      await quizItemService.create(question);
    }

    const quizItems = await quizItemService.getQuizItemByQuizId(quizHistory._id);

    const response = {
      ...quizHistory.toObject(),
      quizes: quizItems
    }

    success(res, response)
  } catch (error) {
    next(error)
  }
}

export async function updateQuizItems(req, res, next) {
  try {

    const dto = await validateIt(req.body, QuizItemDto, QuizItemDtoGroup.UPDATE)

    const word = await WordModel.findById(dto._id)

    if (word.defination == dto.name) {
      dto.isFound = true;
    }

    const quizItem = await QuizItemModel.findByIdAndUpdate(dto._id, dto)
    return success(res, quizItem)


  } catch (error) {
    next(error)
  }
}

export async function getQuizHistoryPagingController(req, res, next) {

  try {


    const data = await validateIt(req.body, QuizHistoryGetDto, QuizDtoGroup.GET_PAGING);

    const histories = await quizHistoryService.getQuizHistoryByPaging(data, req.user._id);

    success(res, histories);

  } catch (e) {
    next(e)
  }

}

export async function getQuizHistoryByIdController(req, res, next) {
  try {
    const _id = req.params.id
    const quizHisotry = await quizHistoryService.findById(_id)
    return success(res, quizHisotry)
  } catch (error) {
    next(error)
  }
}


export async function updateQuizResultController(req, res, next) {
  try {
    const id = req.params.id;
    const quiz = await quizHistoryService.updateById(id, { "isFinished": true, "finishedAt": new Date() })

    success(res, quiz);
  } catch (error) {
    next(error)
  }
}