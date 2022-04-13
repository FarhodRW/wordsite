import { success } from "../../common/response";
import { validateIt } from "../../common/validation";
import { QuizDtoGroup, QuizHistoryGetDto } from "../../db/dto/quiz-history.dto";
import { QuizCreateDto, QuizCreateDtoGroup } from "../../db/dto/quiz.dto";
import { QuizItemDto, QuizItemDtoGroup } from "../../db/dto/quizItem.dto";
import { QuizHistoryError } from "../../db/model/quiz/quiz-history.error";
import { QuizHistory, QuizHistoryModel } from "../../db/model/quiz/quiz-history.model";
import { QuizItemModel } from "../../db/model/quiz/quiz-item/quiz-item.model";
import { WordModel } from "../../db/model/word/word.model";
import { createQuizService } from "../../service/quiz/quiz-create.service";
import { quizHistoryService } from "../../service/quiz/quiz-history.service";
import { quizItemService } from "../../service/quiz/quiz-item.service";

export async function createQuizController(req, res, next) {
  try {

    const dto = await validateIt(req.body, QuizCreateDto, QuizCreateDtoGroup.CREATE)
    console.log("dtoooooo", dto)

    if (!dto.size) {
      const maxQuestions = await createQuizService.getMaxQuestions(dto)
      return success(res, maxQuestions)
    }
    const createdBy = dto.createdBy
    // const questions = await WordModel.aggregate([
    //   { $match: { isDeleted: false, createdBy: createdBy } },
    //   { $sample: { size: +size } },
    //   { $project: { _id: 1, name: 1, defination: 1 } }])
    // console.log(questions)
    const questions = await createQuizService.createQuiz(dto)

    const quizHistoryDto: QuizHistory = {
      createdBy,
      timeLimit: +dto.size * 60,
      totalQuestions: +dto.size,
      finishingAt: new Date((new Date()).setSeconds(new Date().getSeconds() + dto.size * 60))
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


    const data = await validateIt(req.params, QuizHistoryGetDto, QuizDtoGroup.GET_PAGING);

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