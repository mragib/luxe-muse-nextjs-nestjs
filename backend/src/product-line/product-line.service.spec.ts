import { Test, TestingModule } from '@nestjs/testing';
import { ProductLineService } from './product-line.service';

describe('ProductLineService', () => {
  let service: ProductLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductLineService],
    }).compile();

    service = module.get<ProductLineService>(ProductLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
