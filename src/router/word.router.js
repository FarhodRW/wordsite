"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const word_controller_1 = require("../controller/word.controller");
const userAuth_1 = require("../middleware/userAuth");
const router = express_1.default.Router();
router.post('/create', userAuth_1.verifyUserToken, word_controller_1.createWordController);
router.put('/update/:id', userAuth_1.verifyUserToken, word_controller_1.updateWordController);
router.post('/words', userAuth_1.verifyUserToken, word_controller_1.getWordsByPagingController);
router.post('/public', word_controller_1.getPublicWordsByPagingController);
router.delete('/delete/:id', userAuth_1.verifyUserToken, word_controller_1.deleteWordController);
exports.default = router;
