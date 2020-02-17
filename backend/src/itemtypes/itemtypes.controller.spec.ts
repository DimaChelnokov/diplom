import { Test, TestingModule } from '@nestjs/testing';
import { ItemtypesController } from './itemtypes.controller';

describe('Itemtypes Controller', () => {
  let controller: ItemtypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemtypesController],
    }).compile();

    controller = module.get<ItemtypesController>(ItemtypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
