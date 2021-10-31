export class CreateTradeDTO {
  readonly landCode: string;
  readonly yearMonth: string;
}

export class UpdateTradeDTO {
  readonly id: string;
  readonly landCode: string;
  readonly yearMonth: string;
}
