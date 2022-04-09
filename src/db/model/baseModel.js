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
exports.BaseModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = require("mongoose");
const common_model_1 = require("../common/common.model");
let BaseModel = class BaseModel {
};
__decorate([
    (0, typegoose_1.prop)({
        default: false
    }),
    __metadata("design:type", Boolean)
], BaseModel.prototype, "isDeleted", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], BaseModel.prototype, "completelyDeleted", void 0);
__decorate([
    (0, typegoose_1.prop)({
        type: mongoose_1.Types.ObjectId,
        ref: common_model_1.CollectionNames.USERS
    }),
    __metadata("design:type", Object)
], BaseModel.prototype, "createdBy", void 0);
BaseModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true
        }
    }),
    (0, typegoose_1.Index)({
        isDeleted: 1
    }, {
        name: 'isDeleted',
        background: true
    }),
    (0, typegoose_1.Index)({
        createdBy: 1
    }, {
        name: 'createdBy',
        background: true,
        partialFilterExpression: {
            isDeleted: false
        }
    })
], BaseModel);
exports.BaseModel = BaseModel;
