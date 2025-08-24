import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { DonorsService } from './donors.service';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { ConfigService } from '@nestjs/config';

@Controller('donors')
export class DonorsController {
  constructor(
    private readonly donorsService: DonorsService,
    private readonly configService: ConfigService,
    private s3Service: AwsS3Service,
  ) {}

  @Post('create')
@UseInterceptors(FilesInterceptor('photos')) 
async createWithFiles(
  @Body() createDonorDto: CreateDonorDto,
  @UploadedFiles() files: Express.Multer.File[],
) {
  if (!files || files.length === 0) {
    throw new Error('At least one photo is required');
  }

  const photo1Files: string[] = [];
  const photo2Files: string[] = [];
  const photo3Files: string[] = [];

  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uniqueKey = `donors/${Date.now()}-${file.originalname}`;
    await this.s3Service.uploadFile(uniqueKey, file);
    const url = await this.s3Service.generateSignedUrl(uniqueKey);

    if (i === 0) photo1Files.push(url);
    else if (i === 1) photo2Files.push(url);
    else photo3Files.push(url);
  }

  
  createDonorDto.photo1 = photo1Files;
  createDonorDto.photo2 = photo2Files;
  createDonorDto.photo3 = photo3Files;

  
  return this.donorsService.createWithFiles(createDonorDto, files);
}


  @Get()
  findAll() {
    return this.donorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donorsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDonorDto: UpdateDonorDto) {
  //   return this.donorsService.update(+id, updateDonorDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorsService.remove(+id);
  }
}
