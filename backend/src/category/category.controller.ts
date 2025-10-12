import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/auth/decorators/public.decorators';
import { Role } from 'src/types/types';
import { Roles } from 'src/auth/decorators/role.decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('upload-image')
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

  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.categoryService.findOne(id);
    if (!found) throw new NotFoundException('Category is not found');
    return found;
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
