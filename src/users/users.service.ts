import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/models/user.entity';
import { CreateUserDto } from './dtos/cerate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  public async fineOneByEmailAndPassword(
    email: string,
    password: string,
    loadRelations?: string[],
    selections?: [],
  ): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { email, password },
      relations: loadRelations,
      select: selections,
    });
    return user;
  }

  async findOneById(userId: string, relations: string[]) {
    return await this.usersRepo.findOne({
      where: { id: userId },
      relations: relations,
    });
  }

  public async fineOneByEmail(
    email: string,
    loadRelations?: string[],
    selections?: [],
  ): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { email },
      relations: loadRelations,
      select: selections,
    });
    return user;
  }

  async createUser(userDto: CreateUserDto) {
    const user = this.usersRepo.create({ ...userDto });
    try {
      await this.usersRepo.save(user);
      return await this.findOneById(user.id, []);
    } catch (error) {
      throw new BadRequestException({
        statusCode: 404,
        message: error.message,
      });
    }
  }
}
