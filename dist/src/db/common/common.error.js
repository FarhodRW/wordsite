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
exports.commonErrorHandler = exports.UserDefinedError = exports.ErrorItems = exports.ErrorCodes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["SUCCESS"] = 0] = "SUCCESS";
    ErrorCodes[ErrorCodes["DEFAULT"] = 1000] = "DEFAULT";
    ErrorCodes[ErrorCodes["USERS"] = 2000] = "USERS";
    ErrorCodes[ErrorCodes["WORDS"] = 3000] = "WORDS";
    ErrorCodes[ErrorCodes["TAGS"] = 4000] = "TAGS";
    ErrorCodes[ErrorCodes["QUIZ_HISTORY"] = 5000] = "QUIZ_HISTORY";
    ErrorCodes[ErrorCodes["QUIZ_ITEM"] = 6000] = "QUIZ_ITEM";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
var ErrorItems;
(function (ErrorItems) {
    ErrorItems["ITEM"] = "item";
    ErrorItems["USER"] = "user";
    ErrorItems["WORDS"] = "words";
    ErrorItems["TAGS"] = "tags";
})(ErrorItems = exports.ErrorItems || (exports.ErrorItems = {}));
class UserDefinedError {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    static ServerError(data = 'error') {
        return new UserDefinedError(ErrorCodes.DEFAULT + 4, 'Server error', data);
    }
    static UnknownError(data) {
        return new UserDefinedError(ErrorCodes.DEFAULT + 3, 'UnknownError', data);
    }
    static ValidationError(data) {
        return new UserDefinedError(ErrorCodes.DEFAULT + 1, 'Validation failed', data);
    }
    static NotEnoughPermission(data = null) {
        return new UserDefinedError(ErrorCodes.DEFAULT + 2, 'You don`t have permission to do that', data);
    }
    static Success(data = 'OK') {
        return new UserDefinedError(ErrorCodes.SUCCESS, 'Success', data);
    }
}
exports.UserDefinedError = UserDefinedError;
function commonErrorHandler(err, _req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(err);
        res.status(500).send(err);
    });
}
exports.commonErrorHandler = commonErrorHandler;
