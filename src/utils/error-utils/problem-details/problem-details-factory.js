// utils/ProblemDetailsFactory.js

const statusTypeMap = {
  400: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  401: "https://tools.ietf.org/html/rfc7235#section-3.1",
  403: "https://tools.ietf.org/html/rfc7231#section-6.5.3",
  404: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  405: "https://tools.ietf.org/html/rfc7231#section-6.5.5",
  406: "https://tools.ietf.org/html/rfc7231#section-6.5.6",
  409: "https://tools.ietf.org/html/rfc7231#section-6.5.8",
  415: "https://tools.ietf.org/html/rfc7231#section-6.5.13",
  422: "https://datatracker.ietf.org/doc/html/rfc4918#section-11.2",
  500: "https://tools.ietf.org/html/rfc7231#section-6.6.1",
};

export class ProblemDetailsFactory {
  static #create({
    status = 500,
    title,
    detail,
    instance = undefined,
    type = undefined,
    stack = undefined,
    extensions = {},
  }) {
    return {
      type: type || statusTypeMap[status] || "about:blank",
      title: title || "An error occurred",
      status,
      detail,
      instance,
      stack,
      ...extensions,
    };
  }

  static send(res, options) {
    const problem = ProblemDetailsFactory.#create(options);
    res.status(problem.status).type("application/problem+json").send(problem);
  }
}
