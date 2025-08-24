import { Injectable } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Donor, DonorDocument } from './schemas/donor.schema';
import { Model } from 'mongoose';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class DonorsService {
  constructor(
    @InjectModel(Donor.name) private donorModel: Model<DonorDocument>,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async createWithFiles(createDonorDto: CreateDonorDto, files: Express.Multer.File[]) {
    
    const photoUrls: { photo1: string[], photo2: string[], photo3: string[] } = {
      photo1: [],
      photo2: [],
      photo3: [],
    };

    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const s3Path = `donors/${Date.now()}-${file.originalname}`;

      
      const uploadedFileKey = await this.awsS3Service.uploadFile(s3Path, file);

      
      const uploadedFileUrl = await this.awsS3Service.generateSignedUrl(uploadedFileKey);

      
      if (i === 0) photoUrls.photo1.push(uploadedFileUrl);
      else if (i === 1) photoUrls.photo2.push(uploadedFileUrl);
      else if (i === 2) photoUrls.photo3.push(uploadedFileUrl);
    }

    
    const newDonorData = { ...createDonorDto, ...photoUrls };

    
    const newDonor = new this.donorModel(newDonorData);
    return newDonor.save();
  }

  findAll() {
    return `This action returns all donors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donor`;
  }

  remove(id: number) {
    return `This action removes a #${id} donor`;
  }
}
