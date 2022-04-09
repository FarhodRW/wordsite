"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const userAuth_1 = require("../middleware/userAuth");
const router = express_1.default.Router();
router.post('/register', user_controller_1.createUserController);
router.post('/login', user_controller_1.loginUserController);
router.get('/profile', userAuth_1.verifyUserToken, user_controller_1.getUserProfileController);
router.put('/update', userAuth_1.verifyUserToken, user_controller_1.updateUserController);
router.put('/delete', userAuth_1.verifyUserToken, user_controller_1.deleteUserController);
exports.default = router;
