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
exports.userService = void 0;
const base_service_1 = require("./base.service");
const user_model_1 = require("../db/model/user/user.model");
const user_error_1 = require("../db/model/user/user.error");
class UserService extends base_service_1.CommonService {
    constructor(model) {
        super(model);
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ email });
            if (!user)
                throw user_error_1.UserError.NotFound(email);
            return user;
        });
    }
}
exports.userService = new UserService(user_model_1.UserModel);
