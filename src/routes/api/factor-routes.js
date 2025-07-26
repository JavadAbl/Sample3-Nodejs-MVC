import { factorController } from "#controllers/api/factor-controller.js";
import { authMiddleware } from "#middlewares/auth-middleware.js";
import { formdataMiddleware } from "#middlewares/formdata-middleware.js";

export const factorRoutes = {
  domain: "/Factor",
  groupMiddlewares: [authMiddleware],
  routes: [
    {
      method: "post",
      path: "/create",
      handler: (req, res) => factorController.create(req, res),
      middlewares: [formdataMiddleware],
    },
    {
      method: "get",
      path: "/",
      handler: (req, res) => factorController.getAll(req, res),
      middlewares: [],
    },
  ],
};
