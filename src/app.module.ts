import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CronService } from './services/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Price } from './resources/prices/entities/price.entity';
import { PricesModule } from './resources/prices/prices.module';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { User } from './resources/users/entities/user.entity';
import { ConfigService } from './services/config.service';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('DB_NAME'),
      entities: [
        Price,
        User,
      ],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/schema.gql',
      context: ({ req }) => ({ req }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ScheduleModule.forRoot(),
    AuthModule,
    PricesModule,
    UsersModule,
  ],
  providers: [CronService, ConfigService],
  exports: [PassportModule],
})
export class AppModule {}
