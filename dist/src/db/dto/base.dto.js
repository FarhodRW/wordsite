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
exports.BasePagingDto = exports.BaseDto = exports.BaseDtoGroup = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BaseDtoGroup {
}
exports.BaseDtoGroup = BaseDtoGroup;
BaseDtoGroup.CREATE = 'create';
BaseDtoGroup.UPDATE = 'update';
BaseDtoGroup.GET_PAGING = 'get-paging';
BaseDtoGroup.CHOOSE = 'choose';
class BaseDto {
}
exports.BaseDto = BaseDto;
class BasePagingDto {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, class_validator_1.isNumberString)(value) ? Number(value) : value),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false
    }, {
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
    }),
    __metadata("design:type", Number)
], BasePagingDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, class_validator_1.isNumberString)(value) ? Number(value) : value),
    (0, class_validator_1.IsNumber)({
        allowInfinity: false,
        allowNaN: false
    }, {
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
    }),
    __metadata("design:type", Number)
], BasePagingDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
    }),
    (0, class_validator_1.IsString)({
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
    }),
    __metadata("design:type", String)
], BasePagingDto.prototype, "search", void 0);
exports.BasePagingDto = BasePagingDto;
