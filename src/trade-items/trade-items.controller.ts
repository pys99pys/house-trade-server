import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { TradeItemsService } from './trade-items.service';
import { Response } from 'express';

@Controller('trade-items')
export class TradeItemsController {
  constructor(private tradeItemsService: TradeItemsService) {}

  @Get('/:tradeMonth/:stateCode')
  public async getTradeItems(
    @Res() res: Response,
    @Param('tradeMonth') tradeMonth: string,
    @Param('stateCode') stateCode: string,
  ) {
    const tradeItems = await this.tradeItemsService.getTradeItems({
      tradeMonth,
      stateCode,
    });

    return res.status(HttpStatus.OK).json(tradeItems);
  }
}
