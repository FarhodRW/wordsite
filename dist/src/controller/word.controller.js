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
exports.deleteWordController = exports.getPublicWordsByPagingController = exports.getWordsByPagingController = exports.updateWordController = exports.createWordController = void 0;
const response_1 = require("../common/response");
const validation_1 = require("../common/validation");
const word_dto_1 = require("../db/dto/word.dto");
const tag_service_1 = require("../service/tag.service");
const word_service_1 = require("../service/word.service");
function createWordController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dto = yield (0, validation_1.validateIt)(req.body, word_dto_1.WordDto, word_dto_1.WordDtoGroup.CREATE);
            dto.createdBy = req.user._id;
            const tagIds = [];
            if (dto.tags && dto.tags.length) {
                for (const tagName of dto.tags) {
                    console.log(tagName);
                    const tag = yield tag_service_1.tagService.saveTagService(tagName);
                    tagIds.push(tag._id);
                }
            }
            dto.tags = tagIds;
            const data = yield word_service_1.wordService.create(dto);
            (0, response_1.success)(res, data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createWordController = createWordController;
function updateWordController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const dto = yield (0, validation_1.validateIt)(req.body, word_dto_1.WordDto, word_dto_1.WordDtoGroup.UPDATE);
            dto.createdBy = req.user._id;
            const tagIds = [];
            console.log(dto);
            if (dto.tags && dto.tags.length) {
                for (const tagName of dto.tags) {
                    console.log(tagName);
                    const tag = yield tag_service_1.tagService.saveTagService(tagName);
                    tagIds.push(tag._id);
                }
            }
            dto.tags = tagIds;
            console.log(dto);
            const menu = yield word_service_1.wordService.updateById(id, dto);
            (0, response_1.success)(res, menu);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateWordController = updateWordController;
function getWordsByPagingController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dto = yield (0, validation_1.validateIt)(req.body, word_dto_1.WordGetDto, word_dto_1.WordDtoGroup.GET_PAGING);
            dto.createdBy = req.user._id;
            console.log(dto.createdBy);
            const words = yield word_service_1.wordService.getWordsByPaging(dto);
            return (0, response_1.success)(res, words);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getWordsByPagingController = getWordsByPagingController;
function getPublicWordsByPagingController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dto = yield (0, validation_1.validateIt)(req.body, word_dto_1.WordGetDto, word_dto_1.WordDtoGroup.GET_PAGING);
            const words = yield word_service_1.wordService.getPublicWordsByPaging(dto);
            (0, response_1.success)(res, words);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getPublicWordsByPagingController = getPublicWordsByPagingController;
function deleteWordController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const menu = yield word_service_1.wordService.deleteById(id);
            (0, response_1.success)(res, 'success');
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteWordController = deleteWordController;
