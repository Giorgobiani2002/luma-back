import { Module } from '@nestjs/common';
import { DonorsService } from './donors.service';
import { DonorsController } from './donors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Donor, DonorSchema } from './schemas/donor.schema';
import { MulterModule } from '@nestjs/platform-express';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { PhoneRateLimitGuard } from './guards/donore.guard';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Donor.name, schema: DonorSchema }]),
    MulterModule.register({}),
    AwsS3Module,
    EmailSenderModule,
  ],
  controllers: [DonorsController],
  providers: [DonorsService, PhoneRateLimitGuard],
})
export class DonorsModule {}
