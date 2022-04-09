"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_item_controller_1 = require("../../controller/quiz/quiz-item.controller");
const userAuth_1 = require("../../middleware/userAuth");
const quizItemRouter = (0, express_1.Router)();
// quizItemRouter.get('/history/:id', verifyUserToken, getQuizItemHistoryController)
quizItemRouter.get('/quiz/:id', userAuth_1.verifyUserToken, quiz_item_controller_1.getQuizItemController);
quizItemRouter.post('/quiz/answer/:itemId/:wordId', userAuth_1.verifyUserToken, quiz_item_controller_1.answerQuizController);
exports.default = quizItemRouter;
