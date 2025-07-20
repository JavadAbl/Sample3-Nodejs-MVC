import { createServer } from "http";
import Express from "express";
import { router } from "./routes/router.js";

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
