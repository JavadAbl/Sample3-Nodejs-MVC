import { body } from "express-validator";

export class UserValidators {
  static get loginValidator() {
    return [body("email").notEmpty(), body("password").notEmpty()];
  }

  static get registerValidator() {
    return [body("email").notEmpty(), body("password").notEmpty()];
  }
}
