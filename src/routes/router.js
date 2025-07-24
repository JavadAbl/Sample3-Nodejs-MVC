import Express from "express";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";

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

  #attachApiRoutes() {
    this.#attachRoutes(apiRoutes, "/api");
  }

  #attachRoutes(routesGroup, prefix = "") {
    routesGroup.forEach(({ domain, routes, groupMiddlewares = [] }) => {
      routes.forEach(({ method, path, handler, middlewares = [] }) => {
        this.#_router[method](
          prefix + domain + path,
          ...groupMiddlewares,
          ...middlewares,
          handler
        );
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
