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
exports.uploadController = void 0;
const response_1 = require("../common/response");
const common_error_1 = require("../db/common/common.error");
function uploadController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.file)
            throw common_error_1.UserDefinedError.UnknownError('file upload error');
        return (0, response_1.success)(res, req.file.path);
    });
}
exports.uploadController = uploadController;
