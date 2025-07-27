import { pageController } from "#controllers/web/web-controller.js";
import { authPageMiddleware } from "#middlewares/auth-page-middleware.js";
import { formdataMiddleware } from "#middlewares/formdata-middleware.js";
import { validateMiddleware } from "#middlewares/validate-middleware.js";
import { UserValidators } from "#validators/user-validators.js";

export const pageRoutes = {
  domain: "/",

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
      // middlewares: [validateMiddleware(UserValidators.loginValidator)],
      middlewares: [formdataMiddleware],
      handler: (req, res) => pageController.loginPost(req, res),
    },
  ],
};
