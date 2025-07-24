export class AppError extends Error {
  constructor(message, status = 500, extensions) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    this.extensions = extensions;

    //  Error.captureStackTrace(this, this.constructor);
  }
}
