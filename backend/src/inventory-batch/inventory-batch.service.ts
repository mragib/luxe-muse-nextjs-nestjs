import { Injectable } from '@nestjs/common';
import { CreateInventoryBatchDto } from './dto/create-inventory-batch.dto';
import { UpdateInventoryBatchDto } from './dto/update-inventory-batch.dto';

@Injectable()
export class InventoryBatchService {
  create(createInventoryBatchDto: CreateInventoryBatchDto) {
    return 'This action adds a new inventoryBatch';
  }

  findAll() {
    return `This action returns all inventoryBatch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryBatch`;
  }

  update(id: number, updateInventoryBatchDto: UpdateInventoryBatchDto) {
    return `This action updates a #${id} inventoryBatch`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryBatch`;
  }
}
