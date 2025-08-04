import { productService } from "#services/product-service.js";

class APIController {
  //-------------------------------------------------------------------
  async getAllProducts(req, res) {
    const products = await productService.getAllProducts();
    return res.json(products);
  }
}

export const apiController = new APIController();
