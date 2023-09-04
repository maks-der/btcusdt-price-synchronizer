import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CronService } from './services/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Price } from './resources/prices/entities/price.entity';
import { PricesModule } from './resources/prices/prices.module';
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
        Price
      ],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'src/schema.gql',
    }),
    ScheduleModule.forRoot(),
    PricesModule,
  ],
  providers: [CronService]
})
export class AppModule {}
