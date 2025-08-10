/* eslint-disable no-unused-vars */
import { createServer } from "http";
import Express from "express";
import { router } from "./routes/router.js";
import { errorMiddleware } from "#middlewares/error-middleware.js";
import hbs from "express-handlebars";
import path from "path";
import { createLogger } from "#utils/logger/logger.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
export const _dirname = path.dirname(_filename);

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
    this.#setupStaticFiles();
    this.#setupRouter();
    this.#setupViewEngine();
    this.#setupErrorHandlers();

    logger.info("Server Started");
  }

  #setupErrorHandlers() {
    this.#app.use(errorMiddleware);
    // this.#app.get("",(req,res)=>res.stat)
  }

  #setupViewEngine() {
    this.#app.engine(
      "handlebars",
      hbs.engine({
        helpers: {
          numberToLocaleString: (price) => price.toLocaleString(),
          eq: (a, b) => a == b,
          add: (a, b) => a + b,
          subtract: (a, b) => a - b,
          toDateString: (date) => date?.toLocaleString("fa-IR"),
        },
      })
    );
    this.#app.set("view engine", "handlebars");
    this.#app.set("views", path.resolve("src/views"));
  }

  #setupMiddlewares() {
    this.#app.use(Express.urlencoded({ extended: true }));
    this.#app.use(Express.json());
    this.#app.use(cookieParser());
  }

  #setupStaticFiles() {
    this.#app.use(Express.static(path.join(_dirname, "..", "static")));
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
