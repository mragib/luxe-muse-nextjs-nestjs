import { Module } from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { AttributeValueController } from './attribute-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from './entities/attribute-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValue])],
  controllers: [AttributeValueController],
  providers: [AttributeValueService],
})
export class AttributeValueModule {}
