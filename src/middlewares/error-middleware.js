/* eslint-disable no-unused-vars */
import { ProblemDetailsFactory } from "#utils/error-utils/problem-details/problem-details-factory.js";
import { createLogger } from "#utils/logger/logger.js";

export function errorMiddleware(err, req, res, next) {
  const status = err.status ?? 500;

  createLogger("errorMiddleware").error(err.message, err);

  ProblemDetailsFactory.send(res, {
    status,
    detail: err.message,
    stack: err.stack,
    extensions: err.extensions,
  });
}
