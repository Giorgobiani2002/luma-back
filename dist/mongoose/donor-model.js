"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.DonorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    photo1: {
        type: String,
    },
    photo2: {
        type: String,
    },
    photo3: {
        type: String,
    },
    age: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        index: true,
    },
    education: {
        type: String,
        required: true,
    },
    phoneValidation: {
        type: {
            attempts: {
                type: Number,
                default: 3,
            },
            lastAttemptAt: {
                type: Date,
                default: Date.now,
            },
        },
        default: () => ({
            attempts: 3,
            lastAttemptAt: new Date(),
        }),
    },
});
//# sourceMappingURL=donor-model.js.map