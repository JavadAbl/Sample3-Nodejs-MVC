import { ProductDto } from "#dto/product/product-dto.js";
import { productRepository } from "#infrastructure/database/repositories/product-repository.js";

class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  //-----------------------------------------------------------
  async getAllProducts(page) {
    return (await this.productRepository.findAll(page)).map(
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
    const newProduct = {
      name: productDto.name,
      price: productDto.price,
      discount: productDto.discount,
      finalPrice:
        productDto.price - productDto.price * (productDto.discount / 100),
      stock: productDto.stock,
      image: productDto.image || null,
      description: productDto.description || null,
    };

    return await this.productRepository.create(newProduct);
  }
}

export const productService = new ProductService(productRepository);
