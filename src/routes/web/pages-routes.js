import { pageController } from "#controllers/web/web-controller.js";
import { authPageMiddleware } from "#middlewares/auth-page-middleware.js";
import { validateMiddleware } from "#middlewares/validate-middleware.js";
import { UserValidator } from "#validators/user-validator.js";

export const pageRoutes = {
  domain: "/",
  groupMiddlewares: [],
  routes: [
    {
      method: "get",
      path: "/",
      middlewares: [authPageMiddleware],
      handler: (req, res) => pageController.home(req, res),
    },

    {
      method: "get",
      path: "profile",
      handler: pageController.profile,
    },

    {
      method: "get",
      path: "login",
      handler: (req, res) => pageController.login(req, res),
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
      handler: (req, res) => pageController.loginPost(req, res),
    },
  ],
};
