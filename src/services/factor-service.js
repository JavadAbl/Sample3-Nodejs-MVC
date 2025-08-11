import { FactorDto } from "#dto/factor/factor-dto.js";
import { factorRepository } from "#infrastructure/database/repositories/factor-repository.js";
import { productRepository } from "#infrastructure/database/repositories/product-repository.js";

class FactorService {
  constructor(factorRepository, productRepository) {
    this.factorRepository = factorRepository;
    this.productRepository = productRepository;
  }

  //-----------------------------------------------------------
  async getAllFactors(criteria) {
    return (await this.factorRepository.findAll(criteria)).map(
      (product) => new FactorDto(product)
    );
  }

  //-----------------------------------------------------------
  async getPageFactors(page, take) {
    return (
      await this.factorRepository.find({
        page,
        take,
        includes: ["products"],
      })
    ).map((product) => new FactorDto(product));
  }

  //getFactorsCount---------------------------------------------
  async getFactorsCount(criteria) {
    return await this.factorRepository.count(criteria);
  }

  //-----------------------------------------------------------
  async getFactorById(id) {
    return await this.factorRepository.findOne("id", id);
  }

  //-----------------------------------------------------------
  async createFactor(factorDto, user) {
    const products = await productRepository.findAll({
      ids: factorDto.products.map((p) => p.id),
    });
    let price = 0;

    factorDto.products.forEach((p) => {
      price += products.find((product) => product.id === p.id).price * p.count;
    });

    const createFactorData = {
      price: price,
      description: factorDto.description,
      products: { connect: factorDto.products.map((p) => ({ id: p.id })) },
      userId: user.id,
    };

    return await this.factorRepository.create(createFactorData);
  }

  //-----------------------------------------------------------
  submitFactor(id) {
    return this.factorRepository.patch(id, {
      status: 2,
      submitDateTime: new Date(),
    });
  }

  //-----------------------------------------------------------
  cancelFactor(id) {
    return this.factorRepository.patch(id, {
      status: 3,
    });
  }

  //-----------------------------------------------------------
  async factorsSum() {
    const factorPrices = await this.factorRepository.find({
      select: { price: true },
      where: { status: 2 },
    });

    return factorPrices.reduce((sum, factor) => sum + factor.price, 0);
  }
}

export const factorService = new FactorService(
  factorRepository,
  productRepository
);
