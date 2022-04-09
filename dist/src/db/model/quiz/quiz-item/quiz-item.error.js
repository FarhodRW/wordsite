"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizItemError = void 0;
const common_error_1 = require("../../../common/common.error");
class QuizItemError {
    static NotFound(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.QUIZ_ITEM, 'Quiz item with this details not found', data);
    }
    static AlreadyExists(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.QUIZ_ITEM + 1, 'Quiz item with this details already exists', data);
    }
    ;
    static AlreadyAnswered(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.QUIZ_ITEM + 2, 'Quiz item  already answered', data);
    }
    ;
}
exports.QuizItemError = QuizItemError;
