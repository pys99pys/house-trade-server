import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { TradeItemRowDocument } from './dto/trade-items-document.dto';
import { GetTradeItemsDTO } from './dto/trade-items.dto';

const addZeroPad = (n: number): string => {
  return n.toString().padStart(2, '0');
};

const flatSizeFormat = (sizeArea: number): number => {
  const area = sizeArea * 0.3025;
  const addtionalSize = sizeArea < 84 ? 8 : 9;

  return Math.floor(area + addtionalSize);
};

const parseToTradeItemRowDocument = (row: any): TradeItemRowDocument => ({
  address: row['법정동'].trim(),
  apartName: row['아파트'].trim(),
  areaSize: row['전용면적'],
  buildedYear: row['건축년도'],
  flastSize: flatSizeFormat(row['전용면적']),
  floor: row['층'],
  tradeAmount: Number(row['거래금액'].replace(/[^0-9]/gi, '')) * 10000,
  tradeDate: `${row['년']}-${addZeroPad(row['월'])}-${addZeroPad(row['일'])}`,
});

@Injectable()
export class TradeItemsService {
  private async getOriginTradeItems(
    tradeMonth: string,
    stateCode: string,
  ): Promise<any[]> {
    const queryParamsArray = [
      `ServiceKey=T5c42lZohslrPE2KbKAhwYE1Q0yVgOROtyX3MFjKpYXWMpuq%2FseIvXUkP37g%2B%2BqmYTKiBBBCvfD4JmsLpzZ4pA%3D%3D`,
      `DEAL_YMD=${tradeMonth.replace('-', '')}`,
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
    GetTradeItemsDTO: GetTradeItemsDTO,
  ): Promise<TradeItemRowDocument[]> {
    const originTradeItems = await this.getOriginTradeItems(
      GetTradeItemsDTO.tradeMonth,
      GetTradeItemsDTO.stateCode,
    );

    return originTradeItems.map((item) => parseToTradeItemRowDocument(item));
  }
}
