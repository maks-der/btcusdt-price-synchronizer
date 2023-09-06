import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessToken } from './dto/access-token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ITokenPayload } from '../../utils/types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  public async returnValidUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    return (user && user.password === pass) ? user : null;
  }

  public async login(email: string, pass: string): Promise<AccessToken> {
    const user = await this.returnValidUser(email, pass);
    if (!user) throw new UnauthorizedException();

    return this.createToken({ fullName: user.fullName, email });
  }

  public async register(fullName: string, email: string, pass: string): Promise<AccessToken> {
    await this.usersService.create(new CreateUserDto(fullName, email, pass));

    return this.createToken({ fullName, email });
  }

  private createToken(payload: ITokenPayload): AccessToken {
    return { accessToken: this.jwtService.sign(payload) };
  }
}
