import { PartialType } from '@nestjs/mapped-types';
import { CreateChartOfAccountingDto } from './create-chart-of-accounting.dto';

export class UpdateChartOfAccountingDto extends PartialType(CreateChartOfAccountingDto) {}
