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
exports.QuizHistoryModel = exports.QuizHistory = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const common_model_1 = require("../../common/common.model");
const baseModel_1 = require("../baseModel");
let QuizHistory = class QuizHistory extends baseModel_1.BaseModel {
};
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], QuizHistory.prototype, "score", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: () => new Date() }),
    __metadata("design:type", Date)
], QuizHistory.prototype, "startedAt", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", Date)
], QuizHistory.prototype, "finishedAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], QuizHistory.prototype, "isFinished", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", Date)
], QuizHistory.prototype, "finishingAt", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", Number)
], QuizHistory.prototype, "timeLimit", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", Number)
], QuizHistory.prototype, "totalQuestions", void 0);
QuizHistory = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: common_model_1.CollectionNames.QUIZ_HISTORY
        }
    })
], QuizHistory);
exports.QuizHistory = QuizHistory;
exports.QuizHistoryModel = (0, typegoose_1.getModelForClass)(QuizHistory);
