import mongoose from 'mongoose';
export interface Donor extends mongoose.Document {
    name: string;
    lastName: string;
    photo1: string;
    photo2: string;
    photo3: string;
    age: string;
    height: string;
    weight: string;
    mobileNumber: string;
    education: string;
    phoneValidation: {
        attempts: number;
        lastAttemptAt: Date;
    };
}
export declare const DonorSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    lastName: string;
    age: string;
    height: string;
    weight: string;
    mobileNumber: string;
    education: string;
    phoneValidation: {
        attempts: number;
        lastAttemptAt: NativeDate;
    };
    photo1?: string;
    photo2?: string;
    photo3?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    lastName: string;
    age: string;
    height: string;
    weight: string;
    mobileNumber: string;
    education: string;
    phoneValidation: {
        attempts: number;
        lastAttemptAt: NativeDate;
    };
    photo1?: string;
    photo2?: string;
    photo3?: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    lastName: string;
    age: string;
    height: string;
    weight: string;
    mobileNumber: string;
    education: string;
    phoneValidation: {
        attempts: number;
        lastAttemptAt: NativeDate;
    };
    photo1?: string;
    photo2?: string;
    photo3?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
