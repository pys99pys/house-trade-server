import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trade } from './interfaces/trade.interface';
import { CreateTradeDTO } from './dto/trade.dto';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel('Trade') private readonly tradeModel: Model<Trade>,
  ) {}

  async getTrades(landCode: string, yearMonth: string): Promise<Trade> {
    return await this.tradeModel.findOne({ landCode, yearMonth }).exec();
  }

  async createTrade(createTradeDTO: CreateTradeDTO): Promise<Trade> {
    const queryParamArray = [
      `ServiceKey=T5c42lZohslrPE2KbKAhwYE1Q0yVgOROtyX3MFjKpYXWMpuq%2FseIvXUkP37g%2B%2BqmYTKiBBBCvfD4JmsLpzZ4pA%3D%3D`,
      `LAWD_CD=${createTradeDTO.landCode}`,
      `DEAL_YMD=${createTradeDTO.yearMonth}`,
    ];

    const res = await axios.get(
      `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?${queryParamArray.join(
        '&',
      )}`,
    );

    return await this.tradeModel.create({
      landCode: createTradeDTO.landCode,
      yearMonth: createTradeDTO.yearMonth,
      data: JSON.stringify(res.data.response.body.items.item),
    });
  }
}
