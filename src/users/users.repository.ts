import { Repository } from 'typeorm';
import { User as UserEntity } from '../models/user.entity';

export class UsersRepository extends Repository<UserEntity> {}
