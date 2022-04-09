"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizHistoryError = void 0;
const common_error_1 = require("../../common/common.error");
class QuizHistoryError {
    static NotFound(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.QUIZ_HISTORY, 'Score with this details not found', data);
    }
    static AlreadyExists(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.QUIZ_HISTORY + 1, 'Score with this details already exists', data);
    }
    ;
    static AlreadyFinished(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.QUIZ_HISTORY + 2, 'Quiz has already finished', data);
    }
    ;
}
exports.QuizHistoryError = QuizHistoryError;
