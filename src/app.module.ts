import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronService } from './services/cron.service';
import { Price } from './resources/prices/entities/price.entity';
import { PricesModule } from './resources/prices/prices.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { User } from './resources/users/entities/user.entity';
import { ConfigService } from './services/config.service';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: configService.get('DATABASE_URL'),
      entities: [
        Price,
        User,
      ],
      synchronize: true,
      extra: {
        ssl: configService.get('APP_ENV') === 'prod' ? {
          rejectUnauthorized: false,
        } : false,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/schema.gql',
      context: ({ req }) => ({ req }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AuthModule,
    PricesModule,
    UsersModule,
  ],
  providers: [CronService, ConfigService],
  exports: [PassportModule],
})
export class AppModule {
}
