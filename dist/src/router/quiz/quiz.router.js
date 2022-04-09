"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_item_controller_1 = require("../../controller/quiz/quiz-item.controller");
const quiz_controller_1 = require("../../controller/quiz/quiz.controller");
const userAuth_1 = require("../../middleware/userAuth");
const router = express_1.default.Router();
router.post('/create/:size', userAuth_1.verifyUserToken, quiz_controller_1.createQuizController);
router.post('/', userAuth_1.verifyUserToken, quiz_controller_1.getQuizHistoryPagingController);
router.post('/finish/:id', userAuth_1.verifyUserToken, quiz_controller_1.updateQuizResultController);
router.get('/history/:id', userAuth_1.verifyUserToken, quiz_item_controller_1.getQuizItemHistoryController);
exports.default = router;
