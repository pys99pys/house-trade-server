import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trade } from './interfaces/trade.interface';
import { CreateTradeDTO, UpdateTradeDTO } from './dto/trade.dto';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel('Trade') private readonly tradeModel: Model<Trade>,
  ) {}

  public async getData(landCode: string, yearMonth: string) {
    const queryParamArray = [
      `ServiceKey=T5c42lZohslrPE2KbKAhwYE1Q0yVgOROtyX3MFjKpYXWMpuq%2FseIvXUkP37g%2B%2BqmYTKiBBBCvfD4JmsLpzZ4pA%3D%3D`,
      `LAWD_CD=${landCode}`,
      `DEAL_YMD=${yearMonth.replace('-', '')}`,
    ];

    const response = await axios.get(
      `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?${queryParamArray.join(
        '&',
      )}`,
    );

    return response.data.response.body.items?.item || [];
  }

  public isBeforeMonth(dateString: string): boolean {
    const targetDate = new Date(dateString);
    const targetYM = targetDate.getFullYear() + targetDate.getMonth();

    const date = new Date();
    const YM = date.getFullYear() + date.getMonth();

    return targetYM < YM;
  }

  public async getTrades(landCode: string, yearMonth: string): Promise<Trade> {
    return await this.tradeModel.findOne({ landCode, yearMonth }).exec();
  }

  public async createTrade(createTradeDTO: CreateTradeDTO): Promise<Trade> {
    const response = await this.getData(
      createTradeDTO.landCode,
      createTradeDTO.yearMonth,
    );

    return await this.tradeModel.create({
      landCode: createTradeDTO.landCode,
      yearMonth: createTradeDTO.yearMonth,
      data: JSON.stringify(response),
    });
  }
}
