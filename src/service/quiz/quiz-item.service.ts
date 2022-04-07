import { QuizItemModel } from "../../db/model/quiz/quiz-item/quiz-item.model";
import { CommonService } from "../base.service";
import { Model, Types } from 'mongoose'
import { QuizItemError } from "../../db/model/quiz/quiz-item/quiz-item.error";

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
        wordId: 0,
        defination: 0,
        tags: 0,
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

  public async getQuizItemByIdService(_id: Types.ObjectId) {
    const item = await this.findById(_id);
    if (!item) throw QuizItemError.NotFound()

    return item;
  }

  public async getTotalAnswersService(quizHistoryId: Types.ObjectId) {
    const $match = {
      $match: {
        quizHistoryId,
        isCorrect: true
      }
    }

    const $group = {
      $group: {
        _id: null,
        count: {
          $sum: 1
        }
      }
    }

    const pipeline = [$match, $group];

    const total = await this.aggregate(pipeline);

    if (total.length) return total[0].count;
    return 0;
  }
}


export const quizItemService = new QuizItemService(QuizItemModel);