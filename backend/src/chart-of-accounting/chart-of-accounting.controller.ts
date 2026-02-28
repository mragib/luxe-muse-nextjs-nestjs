import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ChartOfAccountingService } from './chart-of-accounting.service';
import { CreateChartOfAccountingDto } from './dto/create-chart-of-accounting.dto';
import { UpdateChartOfAccountingDto } from './dto/update-chart-of-accounting.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('chart-of-accounting')
export class ChartOfAccountingController {
  constructor(
    private readonly chartOfAccountingService: ChartOfAccountingService,
  ) {}

  @Post()
  create(@Body() createChartOfAccountingDto: CreateChartOfAccountingDto) {
    return this.chartOfAccountingService.create(createChartOfAccountingDto);
  }

  @Get()
  findAll() {
    return this.chartOfAccountingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartOfAccountingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChartOfAccountingDto: UpdateChartOfAccountingDto,
  ) {
    return this.chartOfAccountingService.update(
      +id,
      updateChartOfAccountingDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartOfAccountingService.remove(+id);
  }

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
      await this.chartOfAccountingService.parseCsvAndInsertData(filePath);
      return {
        message: 'CSV uploaded and data inserted successfully',
        status: true,
      };
    } catch (error) {
      return { message: 'Error processing CSV file', error, status: false };
    }
  }
}
