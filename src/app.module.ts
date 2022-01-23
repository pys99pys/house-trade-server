import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeModule } from './trade/trade.module';
import { TradeItemsModule } from './trade-items/trade-items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB, {
      useNewUrlParser: true,
    }),
    TradeModule,
    TradeItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
