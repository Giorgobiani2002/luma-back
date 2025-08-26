import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonorSchema } from './donor-model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Donor', schema: DonorSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongooseSchemasModule {}
