import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
