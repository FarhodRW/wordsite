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
exports.wordService = void 0;
const base_service_1 = require("./base.service");
const word_model_1 = require("../db/model/word/word.model");
const common_model_1 = require("../db/common/common.model");
class WordService extends base_service_1.CommonService {
    constructor(model) {
        super(model);
    }
    getWordsByPaging(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit, search, createdBy } = dto;
            let query = {
                isDeleted: false,
                createdBy: createdBy
            };
            console.log(query);
            if (search) {
                query.$or = [
                    {
                        'name': {
                            $regex: search,
                            $options: 'i',
                        }
                    },
                    {
                        'defination': {
                            $regex: search,
                            $options: 'i',
                        }
                    }
                ];
            }
            const $match = {
                $match: { createdBy: createdBy }
            };
            const $lookupTags = {
                $lookup: {
                    from: common_model_1.CollectionNames.TAGS,
                    localField: 'tags',
                    foreignField: '_id',
                    as: 'tags'
                }
            };
            const $unwindTags = {
                $unwind: {
                    path: '$tags',
                    preserveNullAndEmptyArrays: true
                }
            };
            const $group = {
                $group: {
                    _id: '$_id',
                    name: {
                        $first: '$name'
                    },
                    createdAt: {
                        $first: '$createdAt'
                    },
                    defination: {
                        $first: '$defination'
                    },
                    tags: {
                        $push: '$tags.name'
                    },
                    isPrivate: {
                        $first: '$isPrivate'
                    }
                }
            };
            const $skip = {
                $skip: (page - 1)
            };
            const $limit = {
                $limit: limit
            };
            const $sort = {
                $sort: {
                    createdAt: -1
                }
            };
            const pipeline = [
                $match,
                $lookupTags,
                $unwindTags,
                $group,
                $sort,
                $skip,
                $limit
            ];
            const total = yield this.countDocuments(query);
            const data = yield this.aggregate(pipeline);
            return {
                total,
                data
            };
        });
    }
    getPublicWordsByPaging(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit, search } = dto;
            let query = {
                isDeleted: false,
                isPrivate: false
            };
            if (search) {
                query.$or = [
                    {
                        'name': {
                            $regex: search,
                            $options: 'i',
                        }
                    },
                    {
                        'defination': {
                            $regex: search,
                            $options: 'i',
                        }
                    }
                ];
            }
            const $lookupTags = {
                $lookup: {
                    from: common_model_1.CollectionNames.TAGS,
                    localField: 'tags',
                    foreignField: '_id',
                    as: 'tags'
                }
            };
            const $unwindTags = {
                $unwind: {
                    path: '$tags',
                    preserveNullAndEmptyArrays: true
                }
            };
            const $group = {
                $group: {
                    _id: '$_id',
                    name: {
                        $first: '$name'
                    },
                    createdAt: {
                        $first: '$createdAt'
                    },
                    defination: {
                        $first: '$defination'
                    },
                    tags: {
                        $push: '$tags.name'
                    },
                    isPrivate: {
                        $first: '$isPrivate'
                    }
                }
            };
            const $skip = {
                $skip: (page - 1)
            };
            const $limit = {
                $limit: limit
            };
            const $sort = {
                $sort: {
                    createdAt: -1
                }
            };
            const pipeline = [
                { $match: query },
                $lookupTags,
                $unwindTags,
                $group,
                $sort,
                $skip,
                $limit
            ];
            const total = yield this.countDocuments(query);
            const data = yield this.aggregate(pipeline);
            return {
                total,
                data
            };
        });
    }
}
exports.wordService = new WordService(word_model_1.WordModel);
