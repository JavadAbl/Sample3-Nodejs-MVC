import { validationResult } from "express-validator";

export function validateMiddleware(validators) {
  return async (req, res, next) => {
    await Promise.all(validators.map((validator) => validator.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorMessages = "";
      for (const error of errors.array()) {
        errorMessages += error.msg;
      }

      return res.status(400).render(res.locals.view, {
        error: errorMessages,
        oldInput: req.body,
      });
    }

    next();
  };
}
