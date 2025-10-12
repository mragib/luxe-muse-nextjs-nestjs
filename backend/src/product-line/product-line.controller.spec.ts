import { Test, TestingModule } from '@nestjs/testing';
import { ProductLineController } from './product-line.controller';
import { ProductLineService } from './product-line.service';

describe('ProductLineController', () => {
  let controller: ProductLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductLineController],
      providers: [ProductLineService],
    }).compile();

    controller = module.get<ProductLineController>(ProductLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
