import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DonorDocument = Donor & Document;

@Schema()
export class Donor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true })
  height: string;

  @Prop({ required: true })
  weight: string;

  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ required: true })
  education: string;

  @Prop([String], )
  photo1: string[];
  @Prop([String])
  photo2: string[];
  @Prop([String])
  photo3: string[];
  
}

export const DonorSchema = SchemaFactory.createForClass(Donor);