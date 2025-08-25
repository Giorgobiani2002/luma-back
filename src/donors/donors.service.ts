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

  async createWithFiles(
    createDonorDto: CreateDonorDto,
    files: Express.Multer.File[],
  ) {
    const photoUrls: { photo1: string[]; photo2: string[]; photo3: string[] } = {
      photo1: [],
      photo2: [],
      photo3: [],
    };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

     
      const timestamp = Date.now();
      const s3Key = `images/${timestamp}-${file.originalname}`;
      console.log(`[DEBUG] File #${i} original name:`, file.originalname);
      console.log(`[DEBUG] S3 Key:`, s3Key);

      
      await this.awsS3Service.uploadFile(s3Key, file);
      console.log(`[DEBUG] File #${i} uploaded successfully.`);

      
      const url = await this.awsS3Service.generateSignedUrl(s3Key);
      console.log(`[DEBUG] Signed URL generated for file #${i}:`, url);

      
      const expectedUrl = `https://d1hun59bxazh5v.cloudfront.net/${s3Key}`;
      console.log(`[DEBUG] Expected CloudFront URL for file #${i}:`, expectedUrl);

      if (url !== expectedUrl) {
        console.warn(`[WARN] URL mismatch for file #${i}!`);
      }

      
      if (i === 0) photoUrls.photo1.push(url);
      else if (i === 1) photoUrls.photo2.push(url);
      else if (i === 2) photoUrls.photo3.push(url);
    }

    
    const newDonorData = { ...createDonorDto, ...photoUrls };

    
    const newDonor = new this.donorModel(newDonorData);
    console.log('[DEBUG] New donor data:', newDonorData);

    return newDonor.save();
  }



  findAll() {
    return this.donorModel.find().exec();
  }

  findOne(id: string) {
    return this.donorModel.findById(id).exec();
  }

  remove(id: string) {
    return this.donorModel.findByIdAndDelete(id).exec();
  }
}
