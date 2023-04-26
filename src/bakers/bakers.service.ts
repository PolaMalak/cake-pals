import { BadRequestException, Injectable } from '@nestjs/common';
import { BakersRepository } from './bakers.repository';
import { Baker } from 'src/models/baker.entity';
import { CreateBakerDto } from './dtos/add-baker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BakersService {
  constructor(
    private bakersRepository: BakersRepository,
    @InjectRepository(Baker) private bakerRepo: Repository<Baker>,
  ) {}
  public async fineOneByEmailAndPassword(
    email: string,
    password: string,
    loadRelations?: string[],
    selections?: [],
  ): Promise<Baker> {
    const baker = await this.bakerRepo.findOne({
      where: { email, password },
      relations: loadRelations,
      select: selections,
    });
    return baker;
  }

  async findOneById(userId: string, relations?: []): Promise<Baker> {
    return await this.bakerRepo.findOne({
      where: { id: userId },
      relations: relations,
    });
  }

  public async fineOneByEmail(
    email: string,
    loadRelations?: string[],
    selections?: [],
  ): Promise<Baker> {
    const baker = await this.bakerRepo.findOne({
      where: { email },
      relations: loadRelations,
      select: selections,
    });
    return baker;
  }

  async rateBaker(baker: Baker, rate: number) {
    let newRate, newRateCount;
    if (!baker.rateCount) {
      // Check if the user has never been rated before
      newRateCount = 1;
    } else {
      // Accumulate the rate by taking into account the current rate and the new rate
      newRateCount += 1;
    }
    newRate = (baker.rating + rate) / (newRateCount + 1);
    console.log(newRate);
    return await this.bakerRepo.update(baker.id, {
      rateCount: newRateCount,
      rating: newRate,
    });
  }

  async findAllBakers() {
    return await this.bakerRepo.find();
  }

  async createBaker(bakerDto: CreateBakerDto) {
    const baker = this.bakerRepo.create({ ...bakerDto });
    try {
      await this.bakerRepo.save(baker);
      return await this.findOneById(baker.id, []);
    } catch (error) {
      throw new BadRequestException({
        statusCode: 404,
        message: error.message,
      });
    }
  }

  async deleteAll() {
    return await this.bakerRepo.delete({});
  }
}
