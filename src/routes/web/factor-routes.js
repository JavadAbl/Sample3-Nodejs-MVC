import { factorController } from "#controllers/web/factor-controller.js";
import { authPageMiddleware } from "#middlewares/auth-page-middleware.js";
import { paginationMiddleware } from "#middlewares/pagination-middleware.js";
import { validateMiddleware } from "#middlewares/validate-middleware.js";
import { FactorValidator } from "#validators/factor-validator.js";

export const factorRoutes = {
  domain: "/factors",
  middlewares: [authPageMiddleware],
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

    {
      method: "post",
      path: "/create",
      middlewares: [
        (req, res, next) => {
          res.locals.view = "factors";
          next();
        },
        validateMiddleware(FactorValidator.createFactorValidator),
      ],
      handler: (req, res) => factorController.factorController(req, res),
    },
  ],
};
