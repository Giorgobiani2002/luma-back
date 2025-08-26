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
exports.DonorSchema = exports.Donor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Donor = class Donor {
    name;
    lastName;
    age;
    height;
    weight;
    mobileNumber;
    education;
    photo1;
    photo2;
    photo3;
    phoneValidation;
};
exports.Donor = Donor;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Donor.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Donor.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Donor.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Donor.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Donor.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Donor.prototype, "mobileNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Donor.prototype, "education", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Donor.prototype, "photo1", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Donor.prototype, "photo2", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Donor.prototype, "photo3", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            attempts: { type: Number, default: 3 },
            lastAttemptAt: { type: Date, default: Date.now },
        },
        default: () => ({
            attempts: 3,
            lastAttemptAt: new Date(),
        }),
    }),
    __metadata("design:type", Object)
], Donor.prototype, "phoneValidation", void 0);
exports.Donor = Donor = __decorate([
    (0, mongoose_1.Schema)()
], Donor);
exports.DonorSchema = mongoose_1.SchemaFactory.createForClass(Donor);
//# sourceMappingURL=donor.schema.js.map