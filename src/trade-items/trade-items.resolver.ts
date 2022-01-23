import { Args, Query, Resolver } from '@nestjs/graphql';
import { TradeItemsService } from './trade-items.service';
import { TradeItemModel } from './models/trade-item.model';

@Resolver()
export class TradeItemsResolver {
  constructor(private readonly tradeItemsService: TradeItemsService) {}

  @Query(() => [TradeItemModel], { name: 'tradeItems' })
  public async getTradeItems(
    @Args('tradeMonth') tradeMonth: number,
    @Args('stateCode') stateCode: number,
  ) {
    return await this.tradeItemsService.getTradeItems(tradeMonth, stateCode);
  }
}
