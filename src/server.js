import { createServer } from "http";
import Express from "express";
import { router } from "./routes/router.js";
import { db } from "#database/db.js";
import { sync } from "#database/db-sync.js";

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

    this.#createRouter();
    this.#createDBConnection();

    sync();
  }

  #createRouter() {
    this.#router.create(this.#app);
  }

  async #createDBConnection() {
    try {
      await db.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  listen() {
    this.#server.listen(this.#port, () => {
      console.log(`Server listen to port ${this.#port}...`);
    });
  }
}
