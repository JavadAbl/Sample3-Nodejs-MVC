import { CreateProductDto } from "#dto/product/create-product-dto.js";
import { productService } from "#services/product-service.js";

class ProductController {
  //index----------------------------------------------------------
  async index(req, res) {
    const page = req.page || 1;
    const products = await productService.getAllProducts(page);
    const count = await productService.getProductsCount();

    res.render("products", { products, count });
  }

  //create----------------------------------------------------------
  async create(req, res) {
    const productDto = new CreateProductDto(req.body);
    await productService.createProduct(productDto);

    res.redirect("/products");
  }
}

export const productController = new ProductController();
