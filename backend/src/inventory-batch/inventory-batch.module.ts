import { Module } from '@nestjs/common';
import { InventoryBatchService } from './inventory-batch.service';
import { InventoryBatchController } from './inventory-batch.controller';

@Module({
  controllers: [InventoryBatchController],
  providers: [InventoryBatchService],
})
export class InventoryBatchModule {}
