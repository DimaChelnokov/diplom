import { Test, TestingModule } from '@nestjs/testing';
import { GradetypesController } from './gradetypes.controller';

describe('Gradetypes Controller', () => {
  let controller: GradetypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradetypesController],
    }).compile();

    controller = module.get<GradetypesController>(GradetypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
