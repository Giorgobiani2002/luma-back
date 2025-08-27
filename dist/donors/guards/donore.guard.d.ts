import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { DonorDocument } from '../schemas/donor.schema';
export declare class PhoneRateLimitGuard implements CanActivate {
    private donorModel;
    constructor(donorModel: Model<DonorDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
