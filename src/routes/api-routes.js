import { apiController } from "#controllers/api/api-controller.js";
import { authMiddleware } from "#middlewares/auth-middleware.js";

export const routes = {
  domain: "/",
  middlewares: [authMiddleware],
  routes: [
    {
      method: "get",
      path: "GetAllProducts",
      handler: (req, res) => apiController.getAllProducts(req, res),
    },
  ],
};

export const apiRoutes = [routes];
