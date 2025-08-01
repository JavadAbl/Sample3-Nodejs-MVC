import { body } from "express-validator";

export class UserValidator {
  static get loginValidator() {
    return [body("email").notEmpty(), body("password").notEmpty()];
  }

  static get registerValidator() {
    return [body("email").notEmpty(), body("password").notEmpty()];
  }
}
