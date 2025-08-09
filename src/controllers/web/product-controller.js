import { CreateProductDto } from "#dto/product/create-product-dto.js";
import { productService } from "#services/product-service.js";
import { generatePagination } from "#utils/app-utils/app-utils.js";

class ProductController {
  //index----------------------------------------------------------
  async index(req, res) {
    const query = req.query.q;
    const page = req.page || 1;
    const pageSize = 4;

    const [products, count] = await Promise.all([
      productService.getPageProducts(page, pageSize, query),
      productService.getProductsCount(),
    ]);

    const totalPages = Math.ceil(count / pageSize);

    res.render("products", {
      products,
      currentPage: page,
      totalPages,
      pagination: generatePagination(page, totalPages),
    });
  }

  //create----------------------------------------------------------
  async create(req, res) {
    const productDto = new CreateProductDto(req.body);
    await productService.createProduct(productDto);

    res.redirect("/products");
  }
}

export const productController = new ProductController();
