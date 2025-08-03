import { body } from "express-validator";

export class ProductValidator {
  static get createProductValidator() {
    return [
      body("name").notEmpty(),
      body("price").notEmpty().toInt(),
      body("stock").notEmpty(),
    ];
  }
}
