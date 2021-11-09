import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB, {
      useNewUrlParser: true,
    }),
    TradeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
