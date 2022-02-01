import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TradeItemModel {
  @Field()
  address: string;

  @Field()
  apartName: string;

  @Field((type) => Float)
  areaSize: number;

  @Field()
  buildedYear: number;

  @Field((type) => Int)
  flastSize: number;

  @Field((type) => Int)
  floor: number;

  @Field((type) => Float)
  tradeAmount: number;

  @Field()
  tradeDate: string;
}
