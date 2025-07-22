/* eslint-disable no-unused-vars */
import { createServer } from "http";
import Express from "express";
import { router } from "./routes/router.js";
import { ProblemDetailsFactory } from "#utils/error-utils/problem-details/problem-details-factory.js";

export class Server {
  #server;
  #port;
  #app;
  #router;

  constructor(port) {
    this.#port = port;
    this.#app = Express();
    this.#server = createServer(this.#app);
    this.#router = router;

    this.#setupMiddlewares();
    this.#setupRouter();
    this.#setupErrorHanlders();
  }

  #setupErrorHanlders() {
    this.#app.use((err, req, res, next) => {
      const status = err.status ?? 500;

      ProblemDetailsFactory.send(res, {
        status,
        detail: err.message,
        stack: err.stack,
      });
    });
  }

  #setupMiddlewares() {
    this.#app.use(Express.json());
    this.#app.use(Express.urlencoded());
  }

  #setupRouter() {
    this.#router.create(this.#app);
  }

  listen() {
    this.#server.listen(this.#port, () => {
      console.log(`Server listen to port ${this.#port}...`);
    });
  }
}
