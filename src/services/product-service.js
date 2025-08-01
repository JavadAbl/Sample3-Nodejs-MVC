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
