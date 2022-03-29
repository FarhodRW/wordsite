import { success } from "../common/response";
import { validateIt } from "../common/validation";
import { QuizItemDto, QuizItemDtoGroup } from "../db/dto/quizItem.dto";
import { ScoreDto, ScoreDtoGroup } from "../db/dto/score.dto.ts";
import { ScoreModel } from "../db/model/quiz/quiz.model";
import { QuizItemModel } from "../db/model/QuizItem/questionItem.model";
import { WordModel } from "../db/model/word/word.model";

export async function getQuizController(req, res, next) {
  try {
    const size = req.params.size
    const questions = await WordModel.aggregate([{ $sample: { size: +size } }, { $project: { _id: 1, name: 1, defination: 1 } }])
    // console.log(quiz)
    // success(res, quiz)

    console.log(questions)
    for (const question of questions) {
      const variants = await WordModel.aggregate([{ $sample: { size: 4 } }])
      let options = [];
      let ansIndex = Math.floor(Math.random() * 4);

      variants.forEach((item, index) => {
        if (index == ansIndex) {
          options.push({
            name: question.defination,
            _id: question._id,
            isAnswer: true
          })
        }
        if (item._id.toString() !== question._id.toString() && options.length < 4

        )
          options.push({
            name: item.defination,
            _id: item._id,
            isAnswer: false
          })
      })

      question.variants = options;
    }

    const quizItems = await QuizItemModel.insertMany([questions])


    success(res, { data: questions, total: questions.length })
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
    return


  } catch (error) {
    next(error)
  }
}