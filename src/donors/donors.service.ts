import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Donor, DonorDocument } from './schemas/donor.schema';
import { Model } from 'mongoose';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { EmailSenderService } from 'src/email-sender/email-sender.service';

@Injectable()
export class DonorsService {
  constructor(
    @InjectModel(Donor.name) private donorModel: Model<DonorDocument>,
    private readonly awsS3Service: AwsS3Service,
    private readonly emailSenderService: EmailSenderService,
  ) {}

  async createWithFiles(
    createDonorDto: CreateDonorDto,
    files: Express.Multer.File[],
  ) {
    const { mobileNumber } = createDonorDto;

    if (!mobileNumber) {
      throw new BadRequestException('მობილურის ნომერი აუცილებელია');
    }

    await this.checkRateLimit(mobileNumber);

    const photoUrls: { photo1: string; photo2: string; photo3: string } = {
      photo1: '',
      photo2: '',
      photo3: '',
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

      const cloudFrontUrl = `https://d1hun59bxazh5v.cloudfront.net/${s3Key}`;

      const expectedUrl = `https://d1hun59bxazh5v.cloudfront.net/${s3Key}`;
      console.log(
        `[DEBUG] Expected CloudFront URL for file #${i}:`,
        expectedUrl,
      );

      if (url !== expectedUrl) {
        console.warn(`[WARN] URL mismatch for file #${i}!`);
      }

      if (i === 0) photoUrls.photo1 = cloudFrontUrl;
      else if (i === 1) photoUrls.photo2 = cloudFrontUrl;
      else if (i === 2) photoUrls.photo3 = cloudFrontUrl;
    }

    const existingDonor = await this.donorModel.findOne({ mobileNumber });
    if (existingDonor) {
      const updatedDonor = await this.donorModel.findOneAndUpdate(
        { mobileNumber },
        {
          ...createDonorDto,
          ...photoUrls,
        },
        { new: true, upsert: false },
      );

      const donorForEmail = {
        name: updatedDonor.name,
        lastName: updatedDonor.lastName,
        age: updatedDonor.age,
        height: updatedDonor.height,
        weight: updatedDonor.weight,
        mobileNumber: updatedDonor.mobileNumber,
        education: updatedDonor.education,
        photo1: updatedDonor.photo1,
        photo2: updatedDonor.photo2,
        photo3: updatedDonor.photo3,
      };

      await this.emailSenderService.sendEmailHtmltoAdmin(
        // 'donationluma@gmail.com',
        'nozadzegiorgi1011@gmail.com',
        'New User Register',
        donorForEmail,
      );

      return updatedDonor;
    }
    const newDonorData = {
      ...createDonorDto,
      ...photoUrls,
      phoneValidation: {
        attempts: 2,
        lastAttemptAt: new Date(),
      },
    };

    const newDonor = new this.donorModel(newDonorData);

    const savedDonor = await newDonor.save();

    const donorForEmail = {
      name: savedDonor.name,
      lastName: savedDonor.lastName,
      age: savedDonor.age,
      height: savedDonor.height,
      weight: savedDonor.weight,
      mobileNumber: savedDonor.mobileNumber,
      education: savedDonor.education,
      photo1: savedDonor.photo1,
      photo2: savedDonor.photo2,
      photo3: savedDonor.photo3,
    };

    await this.emailSenderService.sendEmailHtmltoAdmin(
      // 'donationluma@gmail.com',
      'nozadzegiorgi1011@gmail.com',
      'New User Register',
      donorForEmail,
    );

    console.log(savedDonor);

    return savedDonor;
  }

  private async checkRateLimit(mobileNumber: string): Promise<void> {
    let existingDonor = await this.donorModel.findOne({ mobileNumber });

    if (!existingDonor) {
      return;
    }

    const now = new Date();
    const lastAttempt = new Date(existingDonor.phoneValidation.lastAttemptAt);
    const timeDifference = now.getTime() - lastAttempt.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= 24) {
      await this.donorModel.findOneAndUpdate(
        { mobileNumber },
        {
          $set: {
            'phoneValidation.attempts': 3,
            'phoneValidation.lastAttemptAt': now,
          },
        },
        { new: true },
      );
      return;
    }

    if (existingDonor.phoneValidation.attempts <= 0) {
      const remainingTime = Math.ceil(24 - hoursDifference);
      throw new BadRequestException(
        `ამ მობილურის ნომერი ${mobileNumber} გაგზავნა შეზღუდულია. სცადეთ ${remainingTime} საათის შემდეგ.`,
      );
    }

    existingDonor = await this.donorModel.findOneAndUpdate(
      { mobileNumber },
      {
        $inc: { 'phoneValidation.attempts': -1 },
      },
      { new: true },
    );
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
