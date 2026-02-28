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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { Public } from 'src/auth/decorators/public.decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads/product-images';

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
    const filePath = `/uploads/product-images/${file.filename}`;

    try {
      return {
        message: 'Image uploaded successfully',
        path: filePath,
      };
    } catch (error) {
      return { message: 'Error processing Image file', error };
    }
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const found = await this.productService.findoneBySlug(slug);
    if (!found) {
      throw new NotFoundException('Product is not found');
    }
    return found;
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
