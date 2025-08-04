import { ProductDto } from "#dto/product/product-dto.js";
import { factorRepository } from "#infrastructure/database/repositories/factor-repository.js";
import { productRepository } from "#infrastructure/database/repositories/product-repository.js";

class FactorService {
  constructor(factorRepository, productRepository) {
    this.factorRepository = factorRepository;
    this.productRepository = productRepository;
  }

  //-----------------------------------------------------------
  async getAllFactors(page, take) {
    return (await this.factorRepository.findPage({ page, take })).map(
      (product) => new ProductDto(product)
    );
  }

  //-----------------------------------------------------------
  async getFactorsCount() {
    return await this.factorRepository.count();
  }

  //-----------------------------------------------------------
  async getFactorById(id) {
    return await this.factorRepository.findOne("id", id);
  }

  //-----------------------------------------------------------
  async createFactor(factorDto) {
    const products = productRepository.findAll({ ids: factorDto.products });
    let price = 0;

    products.forEach((p) => {
      price += p.price * factorDto.count;
    });

    const createFactorData = {
      price,
      count: factorDto.count,
      status: factorDto.status,
      description: factorDto.description,

      Product: { connect: factorDto.products },
    };
    return await this.factorRepository.create(createFactorData);
  }
}

export const factorService = new FactorService(
  factorRepository,
  productRepository
);
