import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB, {
      useNewUrlParser: true,
    }),
    TradeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
