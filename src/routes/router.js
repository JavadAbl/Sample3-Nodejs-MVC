import Express from "express";
import { webRoutes } from "./web/web-routes.js";

class Router {
  #_router = Express.Router();

  create(app) {
    this.#attachWebRoutes();
    this.#attachApiRoutes();
    this.#notFoundRoute();

    app.use(this.#_router);
  }

  #attachWebRoutes() {
    this.#attachRoutes(webRoutes);
  }

  #attachApiRoutes() {}

  #attachRoutes(routesGroup, prefix = "") {
    routesGroup.forEach(({ domain, routes }) => {
      routes.forEach(({ method, path, handler }) => {
        this.#_router[method](prefix + domain + path, handler);
      });
    });
  }

  #notFoundRoute() {
    this.#_router.all("/{*splat}", (req, res) => {
      res.status(404).send("Not Found");
    });
  }
}

export const router = new Router();
