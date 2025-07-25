/* eslint-disable no-unused-vars */
import { createServer } from "http";
import Express from "express";
import { router } from "./routes/router.js";
import { errorMiddleware } from "#middlewares/error-middleware.js";
import hbs from "express-handlebars";
import path from "path";
import { createLogger } from "#utils/logger/logger.js";

const logger = createLogger("Server");

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
    this.#setupViewEngine();
    this.#setupErrorHanlders();

    logger.info("Server Started");
  }

  #setupErrorHanlders() {
    this.#app.use(errorMiddleware);
  }

  #setupViewEngine() {
    this.#app.engine("handlebars", hbs.engine());
    this.#app.set("view engine", "handlebars");
    this.#app.set("views", path.resolve("src/views"));
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
