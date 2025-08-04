import { apiController } from "#controllers/api/factor-api-controller.js";
import { authMiddleware } from "#middlewares/auth-middleware.js";

export const routes = {
  domain: "/",
  middlewares: [authMiddleware],
  routes: [
    {
      method: "get",
      path: "/",
      handler: (req, res) => apiController.getAllProducts(req, res),
    },
  ],
};

export const apiRoutes = [routes];
