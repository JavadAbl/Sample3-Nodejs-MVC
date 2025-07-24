import { userController } from "#controllers/api/user-controller.js";
import { validateMiddleware } from "#middlewares/validate-middleware.js";
import { UserValidators } from "#validators/user-validators.js";

export const userRoutes = {
  domain: "/user",

  routes: [
    {
      method: "post",
      path: "/login",
      middlewares: [validateMiddleware(UserValidators.loginValidator)],
      handler: (req, res) => userController.login(req, res),
    },

    {
      method: "post",
      path: "/register",
      middlewares: [validateMiddleware(UserValidators.registerValidator)],
      handler: (req, res) => userController.register(req, res),
    },

    {
      method: "get",
      path: "/",
      middlewares: [],
      handler: (req, res) => userController.getAll(req, res),
    },
  ],
};
