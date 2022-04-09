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
exports.answerQuizController = exports.getQuizItemController = exports.getQuizItemHistoryController = void 0;
const quiz_item_service_1 = require("../../service/quiz/quiz-item.service");
const mongoose_1 = require("mongoose");
const response_1 = require("../../common/response");
const quiz_history_service_1 = require("../../service/quiz/quiz-history.service");
const quiz_history_error_1 = require("../../db/model/quiz/quiz-history.error");
const quiz_item_error_1 = require("../../db/model/quiz/quiz-item/quiz-item.error");
function getQuizItemHistoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data;
            const quizHistoryId = req.params.id;
            const quizHistory = yield quiz_history_service_1.quizHistoryService.findById(quizHistoryId);
            if (!quizHistory.isFinished) {
                const quizes = yield quiz_item_service_1.quizItemService.getQuizItemByQuizId(new mongoose_1.Types.ObjectId(quizHistoryId));
                return (0, response_1.success)(res, Object.assign(Object.assign({}, quizHistory.toObject()), { quizes }));
            }
            const quizes = yield quiz_item_service_1.quizItemService.getQuizItemHistoryByQuizId(new mongoose_1.Types.ObjectId(quizHistoryId));
            return (0, response_1.success)(res, Object.assign(Object.assign({}, quizHistory.toObject()), { quizes }));
        }
        catch (e) {
            next(e);
        }
    });
}
exports.getQuizItemHistoryController = getQuizItemHistoryController;
function getQuizItemController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const quizHistoryId = req.params.id;
            const items = yield quiz_item_service_1.quizItemService.getQuizItemByQuizId(new mongoose_1.Types.ObjectId(quizHistoryId));
            (0, response_1.success)(res, items);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.getQuizItemController = getQuizItemController;
function answerQuizController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemId = req.params.itemId;
            const wordId = req.params.wordId;
            const item = yield quiz_item_service_1.quizItemService.getQuizItemByIdService(new mongoose_1.Types.ObjectId(itemId));
            if (item.isAnswered)
                throw quiz_item_error_1.QuizItemError.AlreadyAnswered();
            const quizHistory = yield quiz_history_service_1.quizHistoryService.findById(item.quizHistoryId);
            if (quizHistory.isFinished)
                throw quiz_history_error_1.QuizHistoryError.AlreadyFinished();
            if (item.wordId.toString() == wordId.toString())
                item.isCorrect = true;
            item.isAnswered = true;
            item.selectedId = wordId;
            yield item.save();
            yield quiz_history_service_1.quizHistoryService.updateTotal(item.quizHistoryId);
            return (0, response_1.success)(res, item);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.answerQuizController = answerQuizController;
