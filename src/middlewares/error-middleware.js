import { ProblemDetailsFactory } from "#utils/error-utils/problem-details/problem-details-factory.js";

export function errorMiddleware(err, req, res, next) {
  const status = err.status ?? 500;

  ProblemDetailsFactory.send(res, {
    status,
    detail: err.message,
    stack: err.stack,
    extensions: err.extensions,
  });
}
