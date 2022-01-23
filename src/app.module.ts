import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TradeItemsModule } from './trade-items/trade-items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TradeItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
