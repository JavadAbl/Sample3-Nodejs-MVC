import { CreateProductDto } from "#dto/product/create-product-dto.js";
import { productService } from "#services/product-service.js";

class ProductController {
  //index----------------------------------------------------------
  async index(req, res) {
    const products = await productService.getAllProducts();
    res.render("products", { products });
  }

  //create----------------------------------------------------------
  async create(req, res) {
    const productDto = new CreateProductDto(req.body);
    await productService.createProduct(productDto);
    res.redirect("/products");
  }
}

export const productController = new ProductController();
