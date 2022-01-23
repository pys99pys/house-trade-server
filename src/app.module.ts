import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { TradeModule } from './trade/trade.module';
import { TradeItemsModule } from './trade-items/trade-items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
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
