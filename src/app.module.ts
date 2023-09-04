import { Module } from '@nestjs/common';
import { BtcusdtPriceHistoryModule } from './btcusdt-price-history/btcusdt-price-history.module';
import { BtcusdtPriceHistory } from './btcusdt-price-history/entities/btcusdt-price-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        BtcusdtPriceHistory
      ],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'src/schema.gql',
    }),
    BtcusdtPriceHistoryModule
  ],
})
export class AppModule {}
