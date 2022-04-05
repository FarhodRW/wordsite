import { QuizItemModel } from "../../db/model/quiz/quiz-item/quiz-item.model";
import { CommonService } from "../base.service";
import { Model, Types } from 'mongoose'

class QuizItemService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  public async getQuizItemByQuizId(quizHistoryId: Types.ObjectId) {
    const $match = {
      $match: {
        quizHistoryId
      }
    }
    const $project = {
      $project: {
        variants: {
          isAnswer: 0,
          isFound: 0
        }
      }
    }
    const pipeline = [$match, $project]
    const items = await this.model.aggregate(pipeline);

    return items;
  }

  public async getQuizItemHistoryByQuizId(quizHistoryId: Types.ObjectId) {
    const $match = {
      $match: {
        quizHistoryId
      }
    }
    const pipeline = [$match]
    const items = await this.model.aggregate(pipeline);

    return items;
  }
}


export const quizItemService = new QuizItemService(QuizItemModel);