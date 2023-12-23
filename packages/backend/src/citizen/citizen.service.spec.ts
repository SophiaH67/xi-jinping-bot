import { Test, TestingModule } from '@nestjs/testing';
import { CitizenService } from './citizen.service';

describe('CitizenService', () => {
  let service: CitizenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitizenService],
    }).compile();

    service = module.get<CitizenService>(CitizenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
