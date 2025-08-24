import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDonorDto {
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsString() lastName: string;
  @IsNotEmpty() @IsString() age: number;
  @IsNotEmpty() @IsString() height: number;
  @IsNotEmpty() @IsString() weight: number;
  @IsNotEmpty() @IsString() education: string;
  @IsNotEmpty() @IsString() mobileNumber: string;
  photo1: string[];
  photo2: string[];
  photo3: string[];
  
}
