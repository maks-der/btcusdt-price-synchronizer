import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly entityManager: EntityManager) {
  }

  public async create(CreateUserDto: CreateUserDto): Promise<User> {
    const user = await this.entityManager.findOneBy(User, { email: CreateUserDto.email });
    if (user !== null) throw new BadRequestException('User already exist');

    return await this.entityManager.save(User, CreateUserDto);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return  await this.entityManager.findOneBy(User, { email: email });
  }
}
