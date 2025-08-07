import { factorController } from "#controllers/web/factor-controller.js";
import { authPageMiddleware } from "#middlewares/auth-page-middleware.js";
import { paginationMiddleware } from "#middlewares/pagination-middleware.js";

export const factorRoutes = {
  domain: "/factors",
  groupMiddlewares: [authPageMiddleware],
  routes: [
    {
      method: "get",
      path: "/",
      handler: (req, res) => factorController.index(req, res),
    },

    {
      method: "get",
      path: "/Page/:page",
      middlewares: [paginationMiddleware],
      handler: (req, res) => factorController.index(req, res),
    },
  ],
};
