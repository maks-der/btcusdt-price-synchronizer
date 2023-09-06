import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token.dto';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let authService: AuthService;

  const fullName = 'John Doe';
  const email = 'test@example.com';
  const password = 'password123';
  const expectedToken: AccessToken = { accessToken: 'accessToken' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login()', () => {
    it('should return an AccessToken when login is successful', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(expectedToken);      const result = await authResolver.login(email, password);
      expect(authService.login).toBeCalledWith(email, password);
      expect(result).toEqual(expectedToken);
    });

    it('should throw an error when login fails', async () => {
      jest.spyOn(authService, 'login').mockRejectedValue(new Error('Login failed'));
      await expect(authResolver.login(email, password)).rejects.toThrowError('Login failed');
      expect(authService.login).toBeCalledWith(email, password);
    });
  });

  describe('register()', () => {
    it('should return an AccessToken when registration is successful', async () => {
      jest.spyOn(authService, 'register').mockResolvedValue(expectedToken);
      const result = await authResolver.register(fullName, email, password);
      expect(authService.register).toBeCalledWith(fullName, email, password);
      expect(result).toEqual(expectedToken);
    });

    it('should throw an error when registration fails', async () => {
      jest.spyOn(authService, 'register').mockRejectedValue(new Error('Registration failed'));
      await expect(authResolver.register(fullName, email, password)).rejects.toThrowError('Registration failed');
      expect(authService.register).toBeCalledWith(fullName, email, password);
    });
  });
});
