import { Test, TestingModule } from '@nestjs/testing';
import { TradeItemsResolver } from './trade-items.resolver';

describe('TradeItemsResolver', () => {
  let resolver: TradeItemsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeItemsResolver],
    }).compile();

    resolver = module.get<TradeItemsResolver>(TradeItemsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
