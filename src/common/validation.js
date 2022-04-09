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
exports.validateIt = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_error_1 = require("../db/common/common.error");
function pushErrorMessage(error) {
    let messages = [];
    if (error.constraints) {
        Object.keys(error.constraints).forEach(key => {
            messages.push({
                field: error.property,
                message: error.constraints[key]
            });
        });
    }
    if (error.children) {
        for (const child of error.children) {
            const child_messages = pushErrorMessage(child);
            messages = messages.concat(child_messages);
        }
    }
    return messages;
}
function validateIt(body, classType, groups) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = (0, class_transformer_1.plainToClass)(classType, body, { excludeExtraneousValues: false });
            yield (0, class_validator_1.validateOrReject)(data, { groups, whitelist: true });
            return data;
        }
        catch (errors) {
            console.log('errors', errors);
            let errorMessage = [];
            for (const error of errors) {
                const messages = pushErrorMessage(error);
                errorMessage = errorMessage.concat(messages);
            }
            console.log('messages', errorMessage);
            throw common_error_1.UserDefinedError.ValidationError(errorMessage);
        }
    });
}
exports.validateIt = validateIt;
