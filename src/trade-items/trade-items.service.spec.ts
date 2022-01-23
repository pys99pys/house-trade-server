import { Test, TestingModule } from '@nestjs/testing';
import { TradeItemsService } from './trade-items.service';

describe('TradeItemsService', () => {
  let service: TradeItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeItemsService],
    }).compile();

    service = module.get<TradeItemsService>(TradeItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
