import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { Public } from 'src/auth/decorators/public.decorators';

@Controller('attribute-value')
export class AttributeValueController {
  constructor(private readonly attributeValueService: AttributeValueService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Post()
  create(@Body() createAttributeValueDto: CreateAttributeValueDto) {
    return this.attributeValueService.create(createAttributeValueDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.attributeValueService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.attributeValueService.findOne(id);
    if (!found) throw new NotFoundException('Attribute Value is not found');
    return found;
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeValueDto: UpdateAttributeValueDto,
  ) {
    return this.attributeValueService.update(id, updateAttributeValueDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeValueService.remove(id);
  }
}
