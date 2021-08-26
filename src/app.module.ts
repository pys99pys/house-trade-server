import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ys:u2kxuOf3CepG2h5i@mycluster.ak2dl.mongodb.net/tradeDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    TradeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
