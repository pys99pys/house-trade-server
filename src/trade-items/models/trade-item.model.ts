import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TradeItemModel {
  @Field()
  address: string;

  @Field()
  apartName: string;

  @Field((type) => Int)
  areaSize: number;

  @Field()
  readonly buildedYear: number;

  @Field((type) => Int)
  flastSize: number;

  @Field((type) => Int)
  floor: number;

  @Field((type) => Int)
  tradeAmount: number;

  @Field()
  tradeDate: string;
}
