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
exports.QuizHistoryGetDto = exports.QuizHistoryDto = exports.QuizDtoGroup = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
class QuizDtoGroup extends base_dto_1.BaseDtoGroup {
}
exports.QuizDtoGroup = QuizDtoGroup;
class QuizHistoryDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, class_validator_1.isNumberString)(value) ? Number(value) : value),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false
    }, {
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    }),
    __metadata("design:type", Number)
], QuizHistoryDto.prototype, "totalScore", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, class_validator_1.isNumberString)(value) ? Number(value) : value),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false
    }, {
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    }),
    __metadata("design:type", Number)
], QuizHistoryDto.prototype, "rightScore", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, class_validator_1.isNumberString)(value) ? Number(value) : value),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false
    }, {
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    }),
    __metadata("design:type", Number)
], QuizHistoryDto.prototype, "wrongScore", void 0);
exports.QuizHistoryDto = QuizHistoryDto;
class QuizHistoryGetDto extends base_dto_1.BasePagingDto {
}
exports.QuizHistoryGetDto = QuizHistoryGetDto;
