import { DonorsService } from './donors.service';
import { CreateDonorDto } from './dto/create-donor.dto';
export declare class DonorsController {
    private readonly donorsService;
    constructor(donorsService: DonorsService);
    createWithFiles(createDonorDto: CreateDonorDto, files: Express.Multer.File[]): Promise<import("mongoose").Document<unknown, {}, import("./schemas/donor.schema").DonorDocument, {}, {}> & import("./schemas/donor.schema").Donor & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    ping(): {
        status: string;
    };
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/donor.schema").DonorDocument, {}, {}> & import("./schemas/donor.schema").Donor & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/donor.schema").DonorDocument, {}, {}> & import("./schemas/donor.schema").Donor & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/donor.schema").DonorDocument, {}, {}> & import("./schemas/donor.schema").Donor & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
