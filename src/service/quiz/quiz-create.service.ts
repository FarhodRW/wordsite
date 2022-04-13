import { QuizCreateDto } from "../../db/dto/quiz.dto";
import { CommonService } from "../base.service";
import { Model } from 'mongoose'
import { WordModel } from "../../db/model/word/word.model";


class CreateQuizService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  public async createQuiz(dto: QuizCreateDto) {
    const { size, createdBy, isPrivate, dateFrom, dateTo, tagIds } = dto
    let query: any = { isDeleted: false }

    if (createdBy) query.createdBy = dto.createdBy
    if (isPrivate) query.isPrivate = isPrivate;
    if (tagIds && tagIds.length) {
      query.tags = {
        $in: tagIds
      }
    }

    if (dateFrom && dateTo) {
      query.createdAt = {
        $gte: new Date(dateFrom),
        $lte: new Date(dateTo)
      }
    } else if (dateFrom) {
      query.createdAt = {
        $gte: new Date(dateFrom)
      }
    } else if (dateTo) {
      query.createdAt = {
        $lte: new Date(dateTo)
      }
    }

    const questions = await WordModel.aggregate([
      { $match: query },
      { $sample: { size: +size } },
      { $project: { _id: 1, name: 1, defination: 1 } }])

    const maxQuestions = await this.model.countDocuments(query)

    return questions

  }

}
export const createQuizService = new CreateQuizService(WordModel);
