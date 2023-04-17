import { Test, TestingModule } from '@nestjs/testing';
import { BakersService } from './bakers.service';

describe('BakersService', () => {
  let service: BakersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BakersService],
    }).compile();

    service = module.get<BakersService>(BakersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
