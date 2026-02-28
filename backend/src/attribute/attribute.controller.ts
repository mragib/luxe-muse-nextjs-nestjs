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
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { Public } from 'src/auth/decorators/public.decorators';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Post()
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributeService.create(createAttributeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.attributeService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.attributeService.findOne(id);
    if (!found) throw new NotFoundException('Attribute is not found');
    return found;
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributeService.update(id, updateAttributeDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeService.remove(id);
  }
}
