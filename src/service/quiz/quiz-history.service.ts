import { CommonService } from "../base.service";
import { Model, Types, Document } from 'mongoose'
import { QuizHistory, QuizHistoryModel } from "../../db/model/quiz/quiz-history.model";
import { quizItemService } from "./quiz-item.service";
import { Ref } from "@typegoose/typegoose";
import { QuizHistoryGetDto } from "../../db/dto/quiz-history.dto";

class QuizHistoryService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }


  public async updateTotal(_id: Types.ObjectId | Ref<QuizHistory>) {
    const quizHistory: QuizHistory & Document = await this.model.findById(_id);
    const correctAnswers = await quizItemService.getTotalAnswersService(quizHistory._id);
    quizHistory.score = correctAnswers;
    await quizHistory.save();
  }

  public async checkTimeLimit() {
    const query = {
      finishedAt: {
        $exists: false
      },
      finishingAt: {
        $lt: new Date()
      }
    }
    const quizHistory: QuizHistory & Document = await this.model.findOne(query);
    if (!quizHistory) return;

    quizHistory.finishedAt = new Date();
    this.updateTotal(quizHistory._id);
    quizHistory.save();
    this.checkTimeLimit();
  }

  public async getQuizHistoryByPaging(dto: QuizHistoryGetDto, user_id) {

    const { page, limit } = dto;

    const quizes = await this.findByPaging({ createdBy: new Types.ObjectId(user_id) }, page, limit)

    return quizes;

  }
}


export const quizHistoryService = new QuizHistoryService(QuizHistoryModel);