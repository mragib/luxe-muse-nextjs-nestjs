import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Public } from 'src/auth/decorators/public.decorators';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { extname } from 'path';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('upload-brand-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads/brand-images';

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const imageName = file.originalname.split('.')[0];
          const fileExt = extname(file.originalname);
          const newFilename = `${imageName}${fileExt}`;
          cb(null, newFilename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = `/uploads/brand-images/${file.filename}`;

    try {
      return {
        message: 'Image uploaded successfully',
        path: filePath,
      };
    } catch (error) {
      return { message: 'Error processing Image file', error };
    }
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.brandService.findOne(id);
    if (!found) throw new NotFoundException('Brand is not found');
    return found;
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
