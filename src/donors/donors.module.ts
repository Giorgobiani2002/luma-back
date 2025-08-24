import { Module } from '@nestjs/common';
import { DonorsService } from './donors.service';
import { DonorsController } from './donors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Donor, DonorSchema } from './schemas/donor.schema';
import { MulterModule } from '@nestjs/platform-express';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Donor.name, schema: DonorSchema }]),
    MulterModule.register({}),
    AwsS3Module,
  ],
  controllers: [DonorsController],
  providers: [DonorsService],
})
export class DonorsModule {}
