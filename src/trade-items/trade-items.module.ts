import { Module } from '@nestjs/common';
import { TradeItemsService } from './trade-items.service';
import { TradeItemsResolver } from './trade-items.resolver';

@Module({
  providers: [TradeItemsService, TradeItemsResolver],
})
export class TradeItemsModule {}
