import { Module } from '@nestjs/common';
import { TradeItemsController } from './trade-items.controller';
import { TradeItemsService } from './trade-items.service';

@Module({
  controllers: [TradeItemsController],
  providers: [TradeItemsService],
})
export class TradeItemsModule {}
