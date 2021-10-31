import { Controller, Param, Get, Res, HttpStatus } from '@nestjs/common';
import { TradeService } from './trade.service';

@Controller('trade')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @Get('/:landCode/:yearMonth')
  public async getTrades(
    @Res() res,
    @Param('landCode') landCode,
    @Param('yearMonth') yearMonth,
  ) {
    const result = await this.tradeService.getTrades(landCode, yearMonth);
    if (result) {
      return res.status(HttpStatus.OK).json(JSON.parse(result.data));
    }

    const isBeforeMonth = this.tradeService.isBeforeMonth(yearMonth);
    if (isBeforeMonth) {
      const createResult = await this.tradeService.createTrade({
        landCode,
        yearMonth,
      });

      return res.status(HttpStatus.OK).json(JSON.parse(createResult.data));
    }

    const fetchResult = await this.tradeService.getData(landCode, yearMonth);
    return res.status(HttpStatus.OK).json(fetchResult);
  }
}
