import { CreateFactorDto } from "#dto/factor/create-factor-dto.js";
import { factorService } from "#services/factor-service.js";
import { productService } from "#services/product-service.js";

class APIController {
  //-------------------------------------------------------------------
  async getAllProducts(req, res) {
    const products = await productService.getAllProducts();
    return res.json(products);
  }

  //-------------------------------------------------------------------
  async createFactor(req, res) {
    const createFactorDto = new CreateFactorDto(req.body);
    await factorService.createFactor(createFactorDto, req.user);
    return res.status(201).send();
  }
}

export const apiController = new APIController();
