import { apiController } from "#controllers/api/api-controller.js";
import { authMiddleware } from "#middlewares/auth-middleware.js";
import { validateAPIMiddleware } from "#middlewares/validate-api-middleware.js";
import { FactorValidator } from "#validators/factor-validator.js";

export const routes = {
  domain: "/",
  groupMiddlewares: [authMiddleware],
  routes: [
    {
      method: "get",
      path: "GetAllProducts",
      handler: (req, res) => apiController.getAllProducts(req, res),
    },

    {
      method: "post",
      path: "Factors/Create",
      middlewares: [
        validateAPIMiddleware(FactorValidator.createFactorValidator),
      ],
      handler: (req, res) => apiController.createFactor(req, res),
    },

    {
      method: "put",
      path: "Factors/Submit/:id",
      middlewares: [],
      handler: (req, res) => apiController.submitFactor(req, res),
    },

    {
      method: "put",
      path: "Factors/Cancel/:id",
      middlewares: [],
      handler: (req, res) => apiController.cancelFactor(req, res),
    },
  ],
};

export const apiRoutes = [routes];
