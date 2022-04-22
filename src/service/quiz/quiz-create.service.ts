import { Model, Types } from 'mongoose';
import { QuizCreateDto } from "../../db/dto/quiz.dto";
import { Visiblity } from "../../db/model/quiz/quiz-history.model";
import { WordModel } from "../../db/model/word/word.model";
import { CommonService } from "../base.service";

class CreateQuizService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  public async createQuiz(dto: QuizCreateDto) {
    const { size, createdBy, dateFrom, dateTo, tagIds, visiblity } = dto
    let query: any = { isDeleted: false }

    // if (createdBy) query.createdBy = dto.createdBy
    if (visiblity == Visiblity.PUBLIC) query.isPrivate = false
    else if (visiblity == Visiblity.PRIVATE) {
      query.isPrivate = true
      query.createdBy = dto.createdBy
    }
    if (tagIds && tagIds.length) {
      query.tags = {
        $in: tagIds.map(tagId => new Types.ObjectId(tagId))
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


    return questions
  }

  public async getMax(dto: QuizCreateDto) {
    const { size, createdBy, dateFrom, dateTo, tagIds, visiblity } = dto
    let query: any = { isDeleted: false }

    if (createdBy) query.createdBy = dto.createdBy
    if (visiblity == Visiblity.PUBLIC) query.isPrivate = false
    else if (visiblity == Visiblity.PRIVATE) query.isPrivate = true
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
    const maximum = await this.model.countDocuments(query)
    return maximum
  }

}
export const createQuizService = new CreateQuizService(WordModel);
