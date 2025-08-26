import { CreateDonorDto } from './dto/create-donor.dto';
import { Donor, DonorDocument } from './schemas/donor.schema';
import { Model } from 'mongoose';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
export declare class DonorsService {
    private donorModel;
    private readonly awsS3Service;
    private EmailSenderService;
    constructor(donorModel: Model<DonorDocument>, awsS3Service: AwsS3Service, EmailSenderService: EmailSenderService);
    createWithFiles(createDonorDto: CreateDonorDto, files: Express.Multer.File[]): Promise<import("mongoose").Document<unknown, {}, DonorDocument, {}, {}> & Donor & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, DonorDocument, {}, {}> & Donor & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, DonorDocument, {}, {}> & Donor & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, DonorDocument, {}, {}> & Donor & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
