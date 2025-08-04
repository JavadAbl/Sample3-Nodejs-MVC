import { body } from "express-validator";

export class FactorValidator {
  static get createFactorValidator() {
    return [
      body("count").notEmpty().toInt(),
      body("products").notEmpty().isArray({ min: 1 }),
    ];
  }
}
