"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordError = void 0;
const common_error_1 = require("../../common/common.error");
class WordError {
    static NotFound(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.WORDS, 'Word with this details not found', data);
    }
    static AlreadyExists(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.WORDS + 1, 'Word with this details already exists', data);
    }
    ;
}
exports.WordError = WordError;
