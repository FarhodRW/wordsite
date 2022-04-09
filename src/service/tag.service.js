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
exports.tagService = void 0;
const base_service_1 = require("./base.service");
const tag_model_1 = require("../db/model/tag/tag.model");
class TagService extends base_service_1.CommonService {
    constructor(model) {
        super(model);
    }
    saveTagService(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagDto = {
                name
            };
            console.log(name, tagDto);
            const tag = yield this.findByQuery({ name });
            if (!tag)
                return this.create(tagDto);
            return tag;
        });
    }
    getTagsByPaging(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit, search } = dto;
            let query = {
                isDeleted: false
            };
            if (search) {
                query = {
                    'name': {
                        $regex: search,
                        $options: 'i',
                    }
                };
            }
            const $sort = {
                createdAt: -1
            };
            const data = this.findByPaging(query, page, limit, [], $sort);
            return data;
        });
    }
}
exports.tagService = new TagService(tag_model_1.TagModel);
