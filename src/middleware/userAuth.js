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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = void 0;
const user_model_1 = require("../db/model/user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUserToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(' ')[1];
        console.log(token);
        jsonwebtoken_1.default.verify(token, process.env.JWTUSERKEY, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json('Token is not valid!');
            }
            console.log(data);
            const user = yield user_model_1.UserModel.findById(data._id);
            if (!user) {
                return res.status(403).json('Token is not valid!');
            }
            req.user = user;
            console.log(user);
            next();
        }));
    }
    else {
        return res.status(401).send('You are not authenticated');
    }
};
exports.verifyUserToken = verifyUserToken;
