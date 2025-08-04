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
  async getPageProducts(page, take) {
    return (await this.productRepository.findPage({ page, take })).map(
      (product) => new ProductDto(product)
    );
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
