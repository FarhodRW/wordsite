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
exports.deleteTagController = exports.getTagsByPagingController = exports.updateTagController = exports.createTagController = void 0;
const response_1 = require("../common/response");
const validation_1 = require("../common/validation");
const tag_dto_1 = require("../db/dto/tag.dto");
const tag_service_1 = require("../service/tag.service");
function createTagController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dto = yield (0, validation_1.validateIt)(req.body, tag_dto_1.TagDto, tag_dto_1.TagDtoGroup.CREATE);
            dto.createdBy = req.user._id;
            const data = yield tag_service_1.tagService.create(dto);
            (0, response_1.success)(res, data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createTagController = createTagController;
function updateTagController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const dto = yield (0, validation_1.validateIt)(req.body, tag_dto_1.TagDto, tag_dto_1.TagDtoGroup.UPDATE);
            dto.createdBy = req.user._id;
            const menu = yield tag_service_1.tagService.updateById(id, dto);
            (0, response_1.success)(res, menu);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateTagController = updateTagController;
function getTagsByPagingController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dto = yield (0, validation_1.validateIt)(req.body, tag_dto_1.TagGetDto, tag_dto_1.TagDtoGroup.GET_PAGING);
            const tags = yield tag_service_1.tagService.getTagsByPaging(dto);
            (0, response_1.success)(res, tags);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getTagsByPagingController = getTagsByPagingController;
function deleteTagController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const menu = yield tag_service_1.tagService.deleteById(id);
            (0, response_1.success)(res, 'success');
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteTagController = deleteTagController;
