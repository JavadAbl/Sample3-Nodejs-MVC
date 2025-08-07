import { body } from "express-validator";
/* 
export class FactorValidator {
  static get createFactorValidator() {
    return [body("products").notEmpty().isArray({ min: 1 })];
  }
}
 */

export class FactorValidator {
  static get createFactorValidator() {
    return [
      body("products").notEmpty().isArray({ min: 1 }),
      body("products.*.id").isNumeric().toInt(),
      body("products.*.count").isNumeric().toInt(),
    ];
  }
}
