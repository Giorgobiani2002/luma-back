import { Document } from 'mongoose';
export type DonorDocument = Donor & Document;
export declare class Donor {
    name: string;
    lastName: string;
    age: string;
    height: string;
    weight: string;
    mobileNumber: string;
    education: string;
    photo1: string[];
    photo2: string[];
    photo3: string[];
    phoneValidation: {
        attempts: number;
        lastAttemptAt: Date;
    };
}
export declare const DonorSchema: import("mongoose").Schema<Donor, import("mongoose").Model<Donor, any, any, any, Document<unknown, any, Donor, any, {}> & Donor & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Donor, Document<unknown, {}, import("mongoose").FlatRecord<Donor>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Donor> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
