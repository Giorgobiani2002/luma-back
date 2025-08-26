import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class PhoneRateLimitGuard implements CanActivate {
    private donorModel;
    constructor(donorModel: any);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
