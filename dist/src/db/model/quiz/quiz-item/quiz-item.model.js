"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizItemModel = exports.QuizItem = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const common_model_1 = require("../../../common/common.model");
const baseModel_1 = require("../../baseModel");
const mongoose_1 = require("mongoose");
class QuizVariants {
}
__decorate([
    (0, typegoose_1.prop)({ required: true, type: mongoose_1.Types.ObjectId, ref: common_model_1.CollectionNames.WORDS }),
    __metadata("design:type", Object)
], QuizVariants.prototype, "wordId", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], QuizVariants.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], QuizVariants.prototype, "isAnswer", void 0);
let QuizItem = class QuizItem extends baseModel_1.BaseModel {
};
__decorate([
    (0, typegoose_1.prop)({ type: mongoose_1.Types.ObjectId, ref: common_model_1.CollectionNames.QUIZ_HISTORY }),
    __metadata("design:type", Object)
], QuizItem.prototype, "quizHistoryId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: mongoose_1.Types.ObjectId, ref: common_model_1.CollectionNames.WORDS }),
    __metadata("design:type", Object)
], QuizItem.prototype, "wordId", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: mongoose_1.Types.ObjectId, ref: common_model_1.CollectionNames.WORDS }),
    __metadata("design:type", Object)
], QuizItem.prototype, "selectedId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], QuizItem.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], QuizItem.prototype, "defination", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], QuizItem.prototype, "tags", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], QuizItem.prototype, "isPrivate", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], QuizItem.prototype, "isCorrect", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], QuizItem.prototype, "isAnswered", void 0);
__decorate([
    (0, typegoose_1.prop)({ _id: false, default: [], type: () => [QuizVariants] }),
    __metadata("design:type", Array)
], QuizItem.prototype, "variants", void 0);
QuizItem = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: common_model_1.CollectionNames.QUIZ_ITEMS
        }
    })
], QuizItem);
exports.QuizItem = QuizItem;
exports.QuizItemModel = (0, typegoose_1.getModelForClass)(QuizItem);
