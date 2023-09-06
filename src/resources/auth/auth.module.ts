import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../../services/config.service';

const configService = new ConfigService();

@Module({
  imports: [
    JwtModule.register({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    ConfigService,
    JwtStrategy,
    UsersService,
  ],
})
export class AuthModule {
}
