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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
const sharp_1 = __importDefault(require("sharp"));
let AwsS3Service = class AwsS3Service {
    storageService;
    bucketName;
    constructor() {
        this.bucketName = process.env.AWS_BUCKET_NAME;
        this.storageService = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            forcePathStyle: false,
        });
        this.bucketName = process.env.AWS_BUCKET_NAME;
    }
    async uploadFile(filePath, file) {
        if (!filePath) {
            console.error('Error: No file path provided.');
            throw new Error('File path is required');
        }
        if (!file || !file.buffer) {
            console.error('Error: Invalid file provided.');
            throw new Error('Invalid file or missing buffer');
        }
        try {
            console.log('Compressing file...');
            const compressedBuffer = await (0, sharp_1.default)(file.buffer)
                .resize(800)
                .jpeg({ quality: 80 })
                .toBuffer();
            console.log('File compressed successfully.');
            const config = {
                Key: filePath,
                Bucket: this.bucketName,
                Body: compressedBuffer,
                ContentType: file.mimetype,
            };
            const uploadCommand = new client_s3_1.PutObjectCommand(config);
            await this.storageService.send(uploadCommand);
            console.log('File uploaded successfully');
            return filePath;
        }
        catch (error) {
            console.error('Error uploading file:', error.message);
            throw new Error('Failed to upload file');
        }
    }
    async getFileById(filePath) {
        if (!filePath)
            return;
        try {
            const config = {
                Bucket: this.bucketName,
                Key: filePath,
            };
            const command = new client_s3_1.GetObjectCommand(config);
            const fileStream = await this.storageService.send(command);
            if (fileStream.Body instanceof stream_1.Readable) {
                const chunks = [];
                for await (const chunk of fileStream.Body) {
                    chunks.push(chunk);
                }
                const fileBuffer = Buffer.concat(chunks);
                const b64 = fileBuffer.toString('base64');
                const file = `data:${fileStream.ContentType};base64,${b64}`;
                return file;
            }
        }
        catch (error) {
            console.error('Error retrieving file:', error);
            throw new Error('Failed to retrieve file');
        }
    }
    async deleteFileById(fileId) {
        if (!fileId)
            throw new Error('File ID is required');
        try {
            const config = {
                Bucket: this.bucketName,
                Key: fileId,
            };
            const command = new client_s3_1.DeleteObjectCommand(config);
            await this.storageService.send(command);
            return fileId;
        }
        catch (error) {
            console.error('Error deleting file:', error);
            throw new Error('Failed to delete file');
        }
    }
    async generateSignedUrl(filePath) {
        if (!filePath)
            throw new Error('File path is required');
        try {
            const cloudfrontDomain = 'd1hun59bxazh5v.cloudfront.net';
            const permanentUrl = `https://${cloudfrontDomain}/${filePath}`;
            return permanentUrl;
        }
        catch (error) {
            console.error('Error generating permanent URL:', error);
            throw new Error('Failed to generate permanent URL');
        }
    }
};
exports.AwsS3Service = AwsS3Service;
exports.AwsS3Service = AwsS3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AwsS3Service);
//# sourceMappingURL=aws-s3.service.js.map