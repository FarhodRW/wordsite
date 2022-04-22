import { Ref } from "@typegoose/typegoose";
import { Document, Model, Types } from 'mongoose';
import { QuizHistoryDto, QuizHistoryGetDto } from "../../db/dto/quiz-history.dto";
import { QuizHistory, QuizHistoryModel } from "../../db/model/quiz/quiz-history.model";
import { CommonService } from "../base.service";
import { quizItemService } from "./quiz-item.service";

class QuizHistoryService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  public async save(dto: QuizHistory) {

    try {
      const quiz = await this.create(dto);
      return quiz;
    } catch (e) {
      console.log(e);
      // if (e.code == 11000) {

      // }
    }
  }

  public async findById(id) {
    const quiz = await this.model.findById(id)
    return quiz
  }


  public async updateTotal(_id: Types.ObjectId | Ref<QuizHistory>) {
    const quizHistory: QuizHistory & Document = await this.model.findById(_id);
    const correctAnswers = await quizItemService.getTotalAnswersService(quizHistory._id);
    quizHistory.score = correctAnswers;
    await quizHistory.save();
  }

  public async checkTimeLimit() {
    const query = {
      isFinished: false,
      finishingAt: {
        $lt: new Date()
      }
    }
    const quizHistory: QuizHistory & Document = await this.model.findOne(query);
    if (!quizHistory) return;

    quizHistory.finishedAt = new Date();
    quizHistory.isFinished = true
    this.updateTotal(quizHistory._id);
    quizHistory.save();
    this.checkTimeLimit();
  }

  public async getQuizHistoryByPaging(dto: QuizHistoryGetDto, user_id) {

    const { page, limit } = dto;

    const quizes = await this.findByPaging({ createdBy: new Types.ObjectId(user_id) }, page, limit)

    return quizes;

  }


  public async updateQuizById(id, dto) {

    try {
      const category = await this.updateById(id, dto);
      return category;
    } catch (e) {
      console.log(e);
      throw e;
      // if (e.code == 11000) {

      // }
    }
  }

}


export const quizHistoryService = new QuizHistoryService(QuizHistoryModel);