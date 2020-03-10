import { Test, TestingModule } from '@nestjs/testing';
import { GradetypesService } from './gradetypes.service';

describe('GradetypesService', () => {
  let service: GradetypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradetypesService],
    }).compile();

    service = module.get<GradetypesService>(GradetypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
