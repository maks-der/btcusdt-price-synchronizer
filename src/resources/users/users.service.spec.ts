import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: EntityManager,
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('create()', () => {
    it('should create a new user when valid data is provided', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      };
      const user = new User();
      user.email = createUserDto.email;

      jest.spyOn(entityManager, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(entityManager, 'save').mockResolvedValue(user);
      jest.spyOn(usersService as any, 'validateEmail');
      const result = await usersService.create(createUserDto);

      expect(entityManager.findOneBy).toBeCalledWith(User, { email: createUserDto.email });
      expect(entityManager.save).toBeCalledWith(User, createUserDto);
      expect(usersService['validateEmail']).toBeCalledWith(createUserDto.email);
      expect(result).toEqual(user);
    });

    it('should throw BadRequestException when email is not valid', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      };
      jest.spyOn(usersService as any, 'validateEmail');

      await expect(usersService.create(createUserDto)).rejects.toThrowError(BadRequestException);
      expect(usersService['validateEmail']).toBeCalledWith(createUserDto.email);
    });

    it('should throw BadRequestException when user with the same email already exists', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(entityManager, 'findOneBy').mockResolvedValue(new User());
      jest.spyOn(usersService as any, 'validateEmail');

      await expect(usersService.create(createUserDto)).rejects.toThrowError(BadRequestException);
      expect(entityManager.findOneBy).toBeCalledWith(User, { email: createUserDto.email });
      expect(usersService['validateEmail']).toBeCalledWith(createUserDto.email);
    });
  });

  describe('findByEmail()', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const user = new User();
      user.email = email;

      jest.spyOn(entityManager, 'findOneBy').mockResolvedValue(user);
      const result = await usersService.findByEmail(email);

      expect(result).toEqual(user);
    });

    it('should return null when no user is found with the provided email', async () => {
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValue(null);
      const result = await usersService.findByEmail('nonexistent@example.com');
      expect(result).toBeNull();
    });
  });

  describe('validateEmail()', () => {
    it('should return true for a valid email address', () => {
      const validEmail = 'test@example.com';
      const result = usersService['validateEmail'](validEmail);
      expect(result).toBe(true);
    });

    it('should return false for an invalid email address', () => {
      const invalidEmail = 'invalid-email';
      const result = usersService['validateEmail'](invalidEmail);
      expect(result).toBe(false);
    });
  });
});
