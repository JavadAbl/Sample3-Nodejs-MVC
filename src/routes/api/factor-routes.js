import { factorController } from "#controllers/api/factor-controller.js";
import { authMiddleware } from "#middlewares/auth-middleware.js";

export const factorRoutes = {
  domain: "/Factor",
  groupMiddlewares: [authMiddleware],
  routes: [
    {
      method: "get",
      path: "/",
      handler: (req, res) => factorController.getAll(req, res),
      middlewares: [],
    },
  ],
};
