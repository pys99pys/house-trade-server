import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { TradeItemModel } from './models/trade-item.model';

const addZeroPad = (n: number): string => {
  return n.toString().padStart(2, '0');
};

const flatSizeFormat = (sizeArea: number): number => {
  const area = sizeArea * 0.3025;
  const addtionalSize = sizeArea < 84 ? 8 : 9;

  return Math.floor(area + addtionalSize);
};

const tradeAmountFormat = (tradeAmount: string): number =>
  Number(tradeAmount.replace(/[^0-9]/gi, '')) * 10000;

const parseToTradeItem = (row: any): TradeItemModel => ({
  address: row['법정동'].trim(),
  apartName: row['아파트'].trim(),
  areaSize: row['전용면적'],
  buildedYear: row['건축년도'],
  flastSize: flatSizeFormat(row['전용면적']),
  floor: row['층'],
  tradeAmount: tradeAmountFormat(row['거래금액']),
  tradeDate: `${row['년']}-${addZeroPad(row['월'])}-${addZeroPad(row['일'])}`,
});

@Injectable()
export class TradeItemsService {
  private async getOriginTradeItems(
    tradeMonth: number,
    stateCode: number,
  ): Promise<any[]> {
    const queryParamsArray = [
      `ServiceKey=T5c42lZohslrPE2KbKAhwYE1Q0yVgOROtyX3MFjKpYXWMpuq%2FseIvXUkP37g%2B%2BqmYTKiBBBCvfD4JmsLpzZ4pA%3D%3D`,
      `DEAL_YMD=${tradeMonth}`,
      `LAWD_CD=${stateCode}`,
    ];

    try {
      const response = await axios.get(
        `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?${queryParamsArray.join(
          '&',
        )}`,
      );

      return response.data.response.body.items?.item || [];
    } catch {
      return [];
    }
  }

  public async getTradeItems(
    tradeMonth: number,
    stateCode: number,
  ): Promise<TradeItemModel[]> {
    const originTradeItems = await this.getOriginTradeItems(
      tradeMonth,
      stateCode,
    );

    return originTradeItems.map((item) => parseToTradeItem(item));
  }
}
