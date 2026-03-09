import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryBatchService } from './inventory-batch.service';
import { CreateInventoryBatchDto } from './dto/create-inventory-batch.dto';
import { UpdateInventoryBatchDto } from './dto/update-inventory-batch.dto';

@Controller('inventory-batch')
export class InventoryBatchController {
  constructor(private readonly inventoryBatchService: InventoryBatchService) {}

  @Post()
  create(@Body() createInventoryBatchDto: CreateInventoryBatchDto) {
    return this.inventoryBatchService.create(createInventoryBatchDto);
  }

  @Get()
  findAll() {
    return this.inventoryBatchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryBatchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryBatchDto: UpdateInventoryBatchDto) {
    return this.inventoryBatchService.update(+id, updateInventoryBatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryBatchService.remove(+id);
  }
}
