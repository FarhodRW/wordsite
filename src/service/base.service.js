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
exports.CommonService = void 0;
class CommonService {
    constructor(model) {
        this.model = model;
    }
    create(dto, options, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.create([dto], options);
            return this.model.findById(data[0]._id, project);
        });
    }
    createMany(dto, options, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.model.insertMany([dto], options);
            return data;
        });
    }
    findById(id, project, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.findById(id, project, options);
            return data;
        });
    }
    findByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.findOne(query);
            return data;
        });
    }
    updateById(id, dto, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                options = true;
            const data = yield this.model.findByIdAndUpdate(id, { $set: dto }, { new: options });
            return data;
        });
    }
    updateByQuery(filter, dto, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.model.updateOne({ filter }, { $set: dto }, { options });
            return data;
        });
    }
    deleteById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.findByIdAndDelete(id, options);
            return data;
        });
    }
    deleteMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.deleteMany(query);
            return data;
        });
    }
    findByPaging(query, page, limit, add_pipeline = [], sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const $match = {
                $match: query
            };
            const $skip = {
                $skip: (page - 1) * limit
            };
            const $limit = {
                $limit: limit
            };
            const $sort = {
                $sort: sort ? sort : { createdAt: -1 }
            };
            const pipeline = [
                $match,
                $sort,
                $skip,
                $limit,
                ...add_pipeline
            ];
            const total = yield this.model.countDocuments(query);
            const data = yield this.model.aggregate(pipeline);
            return {
                total,
                data
            };
        });
    }
    aggregate(pipeline = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.aggregate(pipeline);
        });
    }
    countDocuments(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.countDocuments(query);
            return data;
        });
    }
}
exports.CommonService = CommonService;
