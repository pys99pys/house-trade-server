import { Test, TestingModule } from '@nestjs/testing';
import { TradeItemsController } from './trade-items.controller';

describe('TradeItemsController', () => {
  let controller: TradeItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeItemsController],
    }).compile();

    controller = module.get<TradeItemsController>(TradeItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
