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
exports.DonorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const donor_schema_1 = require("./schemas/donor.schema");
const mongoose_2 = require("mongoose");
const aws_s3_service_1 = require("../aws-s3/aws-s3.service");
const email_sender_service_1 = require("../email-sender/email-sender.service");
let DonorsService = class DonorsService {
    donorModel;
    awsS3Service;
    EmailSenderService;
    constructor(donorModel, awsS3Service, EmailSenderService) {
        this.donorModel = donorModel;
        this.awsS3Service = awsS3Service;
        this.EmailSenderService = EmailSenderService;
    }
    async createWithFiles(createDonorDto, files) {
        const photoUrls = {
            photo1: [],
            photo2: [],
            photo3: [],
        };
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const timestamp = Date.now();
            const s3Key = `images/${timestamp}-${file.originalname}`;
            console.log(`[DEBUG] File #${i} original name:`, file.originalname);
            console.log(`[DEBUG] S3 Key:`, s3Key);
            await this.awsS3Service.uploadFile(s3Key, file);
            console.log(`[DEBUG] File #${i} uploaded successfully.`);
            const url = await this.awsS3Service.generateSignedUrl(s3Key);
            console.log(`[DEBUG] Signed URL generated for file #${i}:`, url);
            const expectedUrl = `https://d1hun59bxazh5v.cloudfront.net/${s3Key}`;
            console.log(`[DEBUG] Expected CloudFront URL for file #${i}:`, expectedUrl);
            if (url !== expectedUrl) {
                console.warn(`[WARN] URL mismatch for file #${i}!`);
            }
            if (i === 0)
                photoUrls.photo1.push(url);
            else if (i === 1)
                photoUrls.photo2.push(url);
            else if (i === 2)
                photoUrls.photo3.push(url);
        }
        const newDonorData = {
            ...createDonorDto,
            ...photoUrls,
            phoneValidation: {
                attempts: 3,
                lastAttemptAt: new Date(),
            },
        };
        const newDonor = new this.donorModel(newDonorData);
        console.log('[DEBUG] New donor data:', newDonorData);
        const savedDonor = await newDonor.save();
        const donorForEmail = {
            name: savedDonor.name,
            lastName: savedDonor.lastName,
            age: savedDonor.age,
            height: savedDonor.height,
            weight: savedDonor.weight,
            mobileNumber: savedDonor.mobileNumber,
            education: savedDonor.education,
            photo1: savedDonor.photo1,
            photo2: savedDonor.photo2,
            photo3: savedDonor.photo3,
        };
        await this.EmailSenderService.sendEmailHtmltoAdmin('donationluma@gmail.com', 'New User Register', donorForEmail);
        return savedDonor;
    }
    findAll() {
        return this.donorModel.find().exec();
    }
    findOne(id) {
        return this.donorModel.findById(id).exec();
    }
    remove(id) {
        return this.donorModel.findByIdAndDelete(id).exec();
    }
};
exports.DonorsService = DonorsService;
exports.DonorsService = DonorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(donor_schema_1.Donor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_s3_service_1.AwsS3Service,
        email_sender_service_1.EmailSenderService])
], DonorsService);
//# sourceMappingURL=donors.service.js.map