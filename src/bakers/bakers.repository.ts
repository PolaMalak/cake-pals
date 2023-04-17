import { Repository } from 'typeorm';
import { Baker as BakerEntity } from '../models/baker.entity';

export class BakersRepository extends Repository<BakerEntity> {}
