import { userController } from "#controllers/web/user-controller.js";
import { authPageMiddleware } from "#middlewares/auth-page-middleware.js";
import { validateMiddleware } from "#middlewares/validate-middleware.js";
import { UserValidator } from "#validators/user-validator.js";

export const userRoutes = {
  domain: "/",
  groupMiddlewares: [],
  routes: [
    {
      method: "get",
      path: "/",
      middlewares: [authPageMiddleware],
      handler: (req, res) => userController.home(req, res),
    },

    {
      method: "get",
      path: "profile",
      handler: userController.profile,
    },

    {
      method: "get",
      path: "login",
      handler: (req, res) => userController.login(req, res),
    },

    {
      method: "post",
      path: "login",
      middlewares: [
        (req, res, next) => {
          res.locals.view = "login";
          next();
        },
        validateMiddleware(UserValidator.loginValidator),
      ],
      handler: (req, res) => userController.loginPost(req, res),
    },
  ],
};
