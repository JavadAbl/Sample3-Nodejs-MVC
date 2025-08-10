import { ProductDto } from "#dto/product/product-dto.js";
import { productRepository } from "#infrastructure/database/repositories/product-repository.js";

class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  //-----------------------------------------------------------
  async getAllProducts() {
    return (await this.productRepository.findAll()).map(
      (product) => new ProductDto(product)
    );
  }
  //-----------------------------------------------------------
  async getPageProducts(page, take, query) {
    return (
      await this.productRepository.find({
        page,
        take,
        ...(query && {
          where: { name: { contains: query } },
        }),
      })
    ).map((product) => new ProductDto(product));
  }

  //-----------------------------------------------------------
  async getProductsCount() {
    return await this.productRepository.count();
  }

  //-----------------------------------------------------------
  async getProductById(id) {
    return await this.productRepository.findOne("id", id);
  }

  //-----------------------------------------------------------
  async createProduct(productDto) {
    return await this.productRepository.create(productDto);
  }
}

export const productService = new ProductService(productRepository);
