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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUserProfileController = exports.loginUserController = exports.createUserController = void 0;
const validation_1 = require("../common/validation");
const user_dto_1 = require("../db/dto/user.dto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../service/user.service");
const response_1 = require("../common/response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_error_1 = require("../db/model/user/user.error");
function createUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dto = yield (0, validation_1.validateIt)(req.body, user_dto_1.UserDto, user_dto_1.UserDtoGroup.REGISTER);
            dto.password = yield bcrypt_1.default.hash(dto.password, 8);
            const data = yield user_service_1.userService.create(dto);
            (0, response_1.success)(res, data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createUserController = createUserController;
function loginUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, validation_1.validateIt)(req.body, user_dto_1.UserDto, user_dto_1.UserDtoGroup.LOGIN);
            const user = yield user_service_1.userService.getUserByEmail(data.email);
            const compare = yield bcrypt_1.default.compare(data.password, user.password);
            if (!compare)
                throw user_error_1.UserError.NotFound(data.email);
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWTUSERKEY);
            (0, response_1.success)(res, { user, token });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.loginUserController = loginUserController;
function getUserProfileController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.user._id;
            console.log(id);
            const user = yield user_service_1.userService.findById(id, '-password');
            (0, response_1.success)(res, user);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUserProfileController = getUserProfileController;
function updateUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.user._id;
            const dto = yield (0, validation_1.validateIt)(req.body, user_dto_1.UserDto, user_dto_1.UserDtoGroup.UPDATE);
            console.log(dto);
            if (dto.password)
                dto.password = yield bcrypt_1.default.hash(dto.password, 8);
            console.log(dto.password);
            const user = yield user_service_1.userService.updateById(id, dto);
            (0, response_1.success)(res, user);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateUserController = updateUserController;
function deleteUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.user._id;
            console.log(id);
            const user = yield user_service_1.userService.updateById(id, { isDeleted: true });
            (0, response_1.success)(res, 'success');
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteUserController = deleteUserController;
