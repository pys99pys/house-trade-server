import { Controller, Param, Get, Res, HttpStatus } from '@nestjs/common';
import { TradeService } from './trade.service';

@Controller('trade')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @Get('/:landCode/:yearMonth')
  async getTrades(
    @Res() res,
    @Param('landCode') landCode,
    @Param('yearMonth') yearMonth,
  ) {
    const trades = await this.tradeService.getTrades(landCode, yearMonth);

    if (trades) {
      return res.status(HttpStatus.OK).json(trades);
    }

    const newTrade = await this.tradeService.createTrade({
      landCode,
      yearMonth,
    });

    return res.status(HttpStatus.OK).json(newTrade);
  }
}
