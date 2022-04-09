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
exports.updateQuizResultController = exports.getQuizHistoryByIdController = exports.getQuizHistoryPagingController = exports.updateQuizItems = exports.createQuizController = void 0;
const response_1 = require("../../common/response");
const validation_1 = require("../../common/validation");
const quiz_history_dto_1 = require("../../db/dto/quiz-history.dto");
const quizItem_dto_1 = require("../../db/dto/quizItem.dto");
const quiz_item_model_1 = require("../../db/model/quiz/quiz-item/quiz-item.model");
const word_model_1 = require("../../db/model/word/word.model");
const quiz_history_service_1 = require("../../service/quiz/quiz-history.service");
const quiz_item_service_1 = require("../../service/quiz/quiz-item.service");
function createQuizController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const size = req.params.size;
            const createdBy = req.user._id;
            const questions = yield word_model_1.WordModel.aggregate([{ $sample: { size: +size } }, { $project: { _id: 1, name: 1, defination: 1 } }]);
            const quizHistoryDto = {
                createdBy,
                timeLimit: +size * 60,
                totalQuestions: +size,
                finishingAt: new Date((new Date()).setSeconds(new Date().getSeconds() + size * 60))
            };
            const quizHistory = yield quiz_history_service_1.quizHistoryService.create(quizHistoryDto);
            for (const question of questions) {
                const variants = yield word_model_1.WordModel.aggregate([{ $sample: { size: 4 } }]);
                let options = [];
                let ansIndex = Math.floor(Math.random() * 4);
                variants.forEach((item, index) => {
                    if (index == ansIndex) {
                        options.push({
                            name: question.defination,
                            _id: question._id,
                            wordId: question._id,
                            isAnswer: true
                        });
                    }
                    if (item._id.toString() !== question._id.toString() && options.length < 4)
                        options.push({
                            name: item.defination,
                            wordId: item._id,
                            _id: item._id
                        });
                });
                question.variants = options;
                question.wordId = question._id;
                question.quizHistoryId = quizHistory._id;
                delete question._id;
                yield quiz_item_service_1.quizItemService.create(question);
            }
            const quizItems = yield quiz_item_service_1.quizItemService.getQuizItemByQuizId(quizHistory._id);
            const response = Object.assign(Object.assign({}, quizHistory.toObject()), { quizes: quizItems });
            (0, response_1.success)(res, response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createQuizController = createQuizController;
function updateQuizItems(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dto = yield (0, validation_1.validateIt)(req.body, quizItem_dto_1.QuizItemDto, quizItem_dto_1.QuizItemDtoGroup.UPDATE);
            const word = yield word_model_1.WordModel.findById(dto._id);
            if (word.defination == dto.name) {
                dto.isFound = true;
            }
            const quizItem = yield quiz_item_model_1.QuizItemModel.findByIdAndUpdate(dto._id, dto);
            return (0, response_1.success)(res, quizItem);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateQuizItems = updateQuizItems;
function getQuizHistoryPagingController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, validation_1.validateIt)(req.body, quiz_history_dto_1.QuizHistoryGetDto, quiz_history_dto_1.QuizDtoGroup.GET_PAGING);
            const histories = yield quiz_history_service_1.quizHistoryService.getQuizHistoryByPaging(data, req.user._id);
            (0, response_1.success)(res, histories);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.getQuizHistoryPagingController = getQuizHistoryPagingController;
function getQuizHistoryByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _id = req.params.id;
            const quizHisotry = yield quiz_history_service_1.quizHistoryService.findById(_id);
            return (0, response_1.success)(res, quizHisotry);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getQuizHistoryByIdController = getQuizHistoryByIdController;
function updateQuizResultController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const quiz = yield quiz_history_service_1.quizHistoryService.updateById(id, { "isFinished": true, "finishedAt": new Date() });
            (0, response_1.success)(res, quiz);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateQuizResultController = updateQuizResultController;
