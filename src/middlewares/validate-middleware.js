import { AppError } from "#utils/error-utils/app-error.js";
import { validationResult } from "express-validator";

export function validateMiddleware(validators) {
  return async (req, res, next) => {
    // Run all validators in parallel
    await Promise.all(validators.map((validator) => validator.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Validation failed", 400, errors));
    }

    next();
  };
}
