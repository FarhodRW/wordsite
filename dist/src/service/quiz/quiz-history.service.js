"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizHistoryService = void 0;
const base_service_1 = require("../base.service");
const mongoose_1 = require("mongoose");
const quiz_history_model_1 = require("../../db/model/quiz/quiz-history.model");
const quiz_item_service_1 = require("./quiz-item.service");
class QuizHistoryService extends base_service_1.CommonService {
    constructor(model) {
        super(model);
    }
    updateTotal(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizHistory = yield this.model.findById(_id);
            const correctAnswers = yield quiz_item_service_1.quizItemService.getTotalAnswersService(quizHistory._id);
            quizHistory.score = correctAnswers;
            yield quizHistory.save();
        });
    }
    checkTimeLimit() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                isFinished: false,
                finishingAt: {
                    $lt: new Date()
                }
            };
            const quizHistory = yield this.model.findOne(query);
            if (!quizHistory)
                return;
            quizHistory.finishedAt = new Date();
            quizHistory.isFinished = true;
            this.updateTotal(quizHistory._id);
            quizHistory.save();
            this.checkTimeLimit();
        });
    }
    getQuizHistoryByPaging(dto, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = dto;
            const quizes = yield this.findByPaging({ createdBy: new mongoose_1.Types.ObjectId(user_id) }, page, limit);
            return quizes;
        });
    }
}
exports.quizHistoryService = new QuizHistoryService(quiz_history_model_1.QuizHistoryModel);
