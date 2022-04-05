import { CommonService } from "../base.service";
import { Model } from 'mongoose'
import { QuizHistoryModel } from "../../db/model/quiz/quiz-history.model";

class QuizHistoryService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }
}


export const quizHistoryService = new QuizHistoryService(QuizHistoryModel);