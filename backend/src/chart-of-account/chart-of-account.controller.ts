import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { ChartOfAccountService } from './chart-of-account.service';
import { CreateChartOfAccountDto } from './dto/create-chart-of-account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-account.dto';

@Controller('chart-of-account')
export class ChartOfAccountController {
  constructor(private readonly chartOfAccountService: ChartOfAccountService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createChartOfAccountDto: CreateChartOfAccountDto) {
    return this.chartOfAccountService.create(createChartOfAccountDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Get()
  findAll() {
    return this.chartOfAccountService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.chartOfAccountService.findOne(+id);
    if (!found) throw new NotFoundException('Chart of account not found');
    return found;
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChartOfAccountDto: UpdateChartOfAccountDto,
  ) {
    return this.chartOfAccountService.update(+id, updateChartOfAccountDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartOfAccountService.remove(+id);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post('upload-csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/chart-of-accounting', // Path where files will be temporarily stored
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = Array(12)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = `./uploads/chart-of-accounting/${file.filename}`;
    try {
      await this.chartOfAccountService.parseCsvAndInsertData(filePath);
      return {
        message: 'CSV uploaded and data inserted successfully',
        status: 'success',
      };
    } catch (error) {
      return { message: 'Error processing CSV file', error, status: 'failed' };
    }
  }
}
