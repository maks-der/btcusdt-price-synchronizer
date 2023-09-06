import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('returnValidUser()', () => {
    it('should return a valid user when email and password match', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { email, password: hashedPassword } as User;

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      const result = await authService['returnValidUser'](email, password);

      expect(usersService.findByEmail).toBeCalled();
      expect(result).toEqual(user);
    });

    it('should return null when email or password do not match', async () => {
      const email = 'test@example.com';
      const password = 'incorrectPassword';

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      const result = await authService['returnValidUser'](email, password);

      expect(usersService.findByEmail).toBeCalled();
      expect(result).toBeNull();
    });
  });

  describe('login()', () => {
    it('should return an AccessToken when login is successful', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { email, password: hashedPassword } as User;

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');
      const result = await authService.login(email, password);

      expect(usersService.findByEmail).toBeCalled();
      expect(jwtService.sign).toBeCalled();
      expect(result).toEqual({ accessToken: 'accessToken' });
    });

    it('should throw UnauthorizedException when login fails', async () => {
      const email = 'test@example.com';
      const password = 'incorrectPassword';

      jest.spyOn(authService as any, 'returnValidUser');
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(authService.login(email, password)).rejects.toThrowError(UnauthorizedException);
      expect(authService['returnValidUser']).toHaveBeenCalledWith(email, password);
      expect(usersService.findByEmail).toBeCalled();
    });
  });

  describe('register()', () => {
    it('should return an AccessToken when registration is successful', async () => {
      const fullName = 'John Doe';
      const email = 'test@example.com';
      const password = 'password123';

      jest.spyOn(usersService, 'create').mockResolvedValue(new User());
      jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');
      const result = await authService.register(fullName, email, password);

      expect(usersService.create).toBeCalled();
      expect(jwtService.sign).toBeCalled();
      expect(result).toEqual({ accessToken: 'accessToken' });
    });
  });
});
