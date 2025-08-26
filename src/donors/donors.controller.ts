import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { DonorsService } from './donors.service';
import { CreateDonorDto } from './dto/create-donor.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PhoneRateLimitGuard } from './guards/donore.guard';

@Controller('donors')
export class DonorsController {
  constructor(private readonly donorsService: DonorsService) {}

  @Post('create')
  // @UseGuards(PhoneRateLimitGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async createWithFiles(
    @Body() createDonorDto: CreateDonorDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('FILES RECEIVED:', files?.length);

    if (!files || files.length === 0) {
      throw new Error('At least one photo is required');
    }

    return this.donorsService.createWithFiles(createDonorDto, files);
  }

  @Get()
  findAll() {
    return this.donorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donorsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorsService.remove(id);
  }
}
