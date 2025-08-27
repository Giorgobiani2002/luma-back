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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneRateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const donor_schema_1 = require("../schemas/donor.schema");
let PhoneRateLimitGuard = class PhoneRateLimitGuard {
    donorModel;
    constructor(donorModel) {
        this.donorModel = donorModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const mobileNumber = request.body.mobileNumber;
        console.log(request, 'request');
        console.log(mobileNumber, 'mobileNumber');
        if (!mobileNumber) {
            throw new common_1.BadRequestException('მობილურის ნომერი აუცილებელია');
        }
        let existingDonor = await this.donorModel.findOne({ mobileNumber });
        if (!existingDonor) {
            return true;
        }
        const now = new Date();
        const lastAttempt = new Date(existingDonor.phoneValidation.lastAttemptAt);
        const timeDifference = now.getTime() - lastAttempt.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        if (hoursDifference >= 24) {
            existingDonor = await this.donorModel.findOneAndUpdate({ mobileNumber }, {
                $set: {
                    'phoneValidation.attempts': 3,
                    'phoneValidation.lastAttemptAt': now,
                },
            }, { new: true });
            return true;
        }
        if (existingDonor.phoneValidation.attempts <= 0) {
            const remainingTime = Math.ceil(24 - hoursDifference);
            throw new common_1.BadRequestException(`ამ მობილურის ნომერი ${mobileNumber} გაგზავნა შეზღუდულია. სცადეთ ${remainingTime} საათის შემდეგ.`);
        }
        existingDonor = await this.donorModel.findOneAndUpdate({ mobileNumber }, {
            $inc: { 'phoneValidation.attempts': -1 },
        }, { new: true });
        const remainingAttempts = existingDonor.phoneValidation.attempts;
        console.log(`[INFO] Mobile ${mobileNumber} has ${remainingAttempts} attempts remaining`);
        return true;
    }
};
exports.PhoneRateLimitGuard = PhoneRateLimitGuard;
exports.PhoneRateLimitGuard = PhoneRateLimitGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(donor_schema_1.Donor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PhoneRateLimitGuard);
//# sourceMappingURL=donore.guard.js.map