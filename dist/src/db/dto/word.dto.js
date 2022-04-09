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
exports.WordGetDto = exports.WordDto = exports.WordDtoGroup = void 0;
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
class WordDtoGroup extends base_dto_1.BaseDtoGroup {
}
exports.WordDtoGroup = WordDtoGroup;
// class Tags {
//   @IsMongoId({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] })
//   @IsString({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] })
//   tag
// }
class WordDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, class_validator_1.IsOptional)({
        groups: [WordDtoGroup.UPDATE]
    }),
    (0, class_validator_1.IsString)({
        groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE]
    }),
    __metadata("design:type", String)
], WordDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] }),
    __metadata("design:type", String)
], WordDto.prototype, "defination", void 0);
__decorate([
    (0, class_validator_1.IsArray)({
        groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE]
    }),
    (0, class_validator_1.IsString)({
        groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE],
        each: true
    }),
    __metadata("design:type", Array)
], WordDto.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] }),
    __metadata("design:type", Boolean)
], WordDto.prototype, "isPrivate", void 0);
exports.WordDto = WordDto;
class WordGetDto extends base_dto_1.BasePagingDto {
}
exports.WordGetDto = WordGetDto;
