"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tag_controller_1 = require("../controller/tag.controller");
const userAuth_1 = require("../middleware/userAuth");
const router = express_1.default.Router();
router.post('/create', userAuth_1.verifyUserToken, tag_controller_1.createTagController);
router.post('/tags', tag_controller_1.getTagsByPagingController);
router.put('/update/:id', userAuth_1.verifyUserToken, tag_controller_1.updateTagController);
router.delete('/delete/:id', userAuth_1.verifyUserToken, tag_controller_1.deleteTagController);
exports.default = router;
