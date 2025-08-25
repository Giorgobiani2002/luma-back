import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PhoneRateLimitGuard implements CanActivate {
  constructor(@InjectModel('Donor') private donorModel) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const mobileNumber = request.body.mobileNumber;

    if (!mobileNumber) {
      throw new BadRequestException('მობილურის ნომერი აუცილებელია');
    }

    const existingDonor = await this.donorModel.findOne({ mobileNumber });

    if (!existingDonor) {
      return true;
    }

    const now = new Date();
    const lastAttempt = new Date(existingDonor.phoneValidation.lastAttemptAt);
    const timeDifference = now.getTime() - lastAttempt.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= 24) {
      await this.donorModel.updateOne(
        { mobileNumber },
        {
          $set: {
            'phoneValidation.attempts': 3,
            'phoneValidation.lastAttemptAt': now,
          },
        },
      );
      return true;
    }

    if (existingDonor.phoneValidation.attempts <= 0) {
      const remainingTime = Math.ceil(24 - hoursDifference);
      throw new BadRequestException(
        ` ამ მობილურის ნომერი ${mobileNumber} გაგზავნა შეზღუდულია. სცადეთ ${remainingTime} საათის შემდეგ.`,
      );
    }

    await this.donorModel.updateOne(
      { mobileNumber },
      {
        $inc: { 'phoneValidation.attempts': -1 },
        $set: { 'phoneValidation.lastAttemptAt': now },
      },
    );

    const remainingAttempts = Math.max(
      0,
      existingDonor.phoneValidation.attempts - 1,
    );
    console.log(
      `[INFO] Mobile ${mobileNumber} has ${remainingAttempts} attempts remaining`,
    );

    return true;
  }
}
