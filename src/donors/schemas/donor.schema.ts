import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DonorDocument = Donor & Document;

@Schema()
export class Donor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: String })
  photo1: string;

  @Prop({ type: String })
  photo2: string;

  @Prop({ type: String })
  photo3: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true })
  height: string;

  @Prop({ required: true })
  weight: string;

  @Prop({ required: true, index: true })
  mobileNumber: string;

  @Prop({ required: true })
  education: string;

  @Prop({
    type: {
      attempts: { type: Number, default: 3 },
      lastAttemptAt: { type: Date, default: Date.now },
    },
    default: () => ({
      attempts: 3,
      lastAttemptAt: new Date(),
    }),
  })
  phoneValidation: {
    attempts: number;
    lastAttemptAt: Date;
  };
}

export const DonorSchema = SchemaFactory.createForClass(Donor);
