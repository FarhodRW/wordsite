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
exports.quizItemService = void 0;
const quiz_item_model_1 = require("../../db/model/quiz/quiz-item/quiz-item.model");
const base_service_1 = require("../base.service");
const quiz_item_error_1 = require("../../db/model/quiz/quiz-item/quiz-item.error");
class QuizItemService extends base_service_1.CommonService {
    constructor(model) {
        super(model);
    }
    getQuizItemByQuizId(quizHistoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const $match = {
                $match: {
                    quizHistoryId
                }
            };
            const $addFields = {
                $addFields: {
                    wordId: {
                        $cond: [
                            {
                                $eq: ['$isAnswered', true]
                            },
                            '$wordId',
                            '$type6'
                        ]
                    }
                }
            };
            const $project = {
                $project: {
                    defination: 0,
                    tags: 0,
                    variants: {
                        isAnswer: 0,
                        isFound: 0
                    }
                }
            };
            const pipeline = [$match, $addFields, $project];
            const items = yield this.model.aggregate(pipeline);
            return items;
        });
    }
    getQuizItemHistoryByQuizId(quizHistoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const $match = {
                $match: {
                    quizHistoryId
                }
            };
            const pipeline = [$match];
            const items = yield this.model.aggregate(pipeline);
            return items;
        });
    }
    getQuizItemByIdService(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.findById(_id);
            if (!item)
                throw quiz_item_error_1.QuizItemError.NotFound();
            return item;
        });
    }
    getTotalAnswersService(quizHistoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const $match = {
                $match: {
                    quizHistoryId,
                    isCorrect: true
                }
            };
            const $group = {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    }
                }
            };
            const pipeline = [$match, $group];
            const total = yield this.aggregate(pipeline);
            if (total.length)
                return total[0].count;
            return 0;
        });
    }
}
exports.quizItemService = new QuizItemService(quiz_item_model_1.QuizItemModel);
