"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
const common_error_1 = require("../../common/common.error");
class UserError {
    static NotFound(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.USERS, 'User with this details not found', data);
    }
    static AlreadyExists(data = null) {
        return new common_error_1.UserDefinedError(common_error_1.ErrorCodes.USERS + 1, 'User with this details already exists', data);
    }
    ;
}
exports.UserError = UserError;
