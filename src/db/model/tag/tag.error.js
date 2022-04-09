"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagError = void 0;
const common_error_1 = require("../../common/common.error");
class TagError {
    static NotFound(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.TAGS, 'Tags with this details not found', data);
    }
    static AlreadyExists(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.TAGS + 1, 'Tags with this details already exists', data);
    }
    ;
}
exports.TagError = TagError;
