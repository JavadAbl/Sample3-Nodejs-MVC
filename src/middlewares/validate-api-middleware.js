import { validationResult } from "express-validator";

export function validateAPIMiddleware(validators) {
  return async (req, res, next) => {
    await Promise.all(validators.map((validator) => validator.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let errorMessages = "";
      for (const error of errors.array()) {
        errorMessages += error.msg;
      }

      return res.statusCode(400).json({
        error: errorMessages,
      });
    }

    next();
  };
}
